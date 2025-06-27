const { execSync } = require("child_process");
const fs = require("fs");

function run(command) {
  console.log(`Running: ${command}`);
  try {
    return execSync(command, { stdio: "inherit" });
  } catch (err) {
    console.error(`Command failed: ${command}`);
    throw err;
  }
}

function tryRun(command) {
  try {
    return execSync(command, { stdio: "pipe" }).toString().trim();
  } catch {
    return null;
  }
}

function getCurrentVersion() {
  const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
  return packageJson.version;
}

function bumpVersion(version) {
  const [major, minor, patch] = version.replace("-SNAPSHOT", "").split(".").map(Number);
  return `${major}.${minor}.${patch + 1}`;
}

function setVersion(version) {
  const file = "package.json";
  const content = fs.readFileSync(file, "utf8");
  const newContent = content.replace(/"version":\s*".+?"/, `"version": "${version}"`);
  fs.writeFileSync(file, newContent);
}

function safeCommit(message) {
  try {
    const diff = execSync('git diff --cached --quiet || echo "has_changes"').toString().trim();
    if (diff === "has_changes") {
      run(`git commit -m "${message}"`);
    } else {
      console.log("No changes to commit.");
    }
  } catch (e) {
    console.error("Failed to check for staged changes:", e.message);
    throw e;
  }
}

function main() {
  const repo = process.env.GIT_REPO_AUTH;
  const profile = process.env.PROFILE || "";

  // Git Setup
  run(`git remote set-url origin ${repo}`);
  run(`git config --global http.sslVerify false`);
  run(`git config --global user.email "ci@spreezy.com"`);
  run(`git config --global user.name "Spreezy CI"`);

  // Fetch and Checkout develop
  run("git fetch origin");
  run("git checkout origin/develop -B develop");

  const currentVersion = getCurrentVersion();
  const releaseVersion = currentVersion.replace("-SNAPSHOT", "");

  // Step 1: Set release version and push to develop
  console.log(`Releasing version: ${releaseVersion}`);
  setVersion(releaseVersion);
  run("git add package.json");
  safeCommit(`Release version ${releaseVersion} on develop`);
  run("git push origin develop");

  // Step 2: Merge develop into master and tag release
  run("git fetch origin master:refs/remotes/origin/master");
  run("git checkout -B master origin/master");
  // run("git checkout origin/master -B master");
  try {
    run(`git merge develop --no-ff -m "Merge release ${releaseVersion} from develop"`);
  } catch (err) {
    console.warn("⚠️ Merge conflict detected. Attempting auto-resolution...");
    run("git checkout --theirs package.json || true");
    run("git checkout --theirs package-lock.json || true");
    run("git checkout --theirs release-version.js || true");

    run("git add .");
    safeCommit(`Auto-resolved merge conflicts for release ${releaseVersion}`);
  }

  // Tag the release
  run(`git tag -a v${releaseVersion} -m "Tag release v${releaseVersion}"`);
  run("git push origin master");
  run(`git push origin v${releaseVersion}`);

  // Step 3: Bump to next SNAPSHOT version on develop
  const nextSnapshot = bumpVersion(releaseVersion) + "-SNAPSHOT";
  run("git checkout develop");
  setVersion(nextSnapshot);
  run("git add package.json");
  safeCommit(`Start development on ${nextSnapshot}`);
  run("git push origin develop");

  console.log("Release flow completed.");
}

main();
