export class TextareaUtils {

    static convertTextareaToListWithBulletPoints(textareaValue: string): string[] {
      return textareaValue
        .split('\n')
        .map(item => item.trim())
        .filter(item => item.length > 0)
        .map(item => (item.startsWith('• ') ? item : `• ${item}`));
    }
  
    static addBulletPointOnEnter(event: KeyboardEvent, textarea: HTMLTextAreaElement): void {
      if (event.key === 'Enter') {
        event.preventDefault();
        const cursorPosition = textarea.selectionStart;
        const textBeforeCursor = textarea.value.slice(0, cursorPosition);
        const textAfterCursor = textarea.value.slice(cursorPosition);
        const updatedText = `${textBeforeCursor}\n• ${textAfterCursor}`;
        textarea.value = updatedText;
        textarea.selectionStart = textarea.selectionEnd = cursorPosition + 3;
      }
    }
  
    static addBulletPointOnFocus(textarea: HTMLTextAreaElement): void {
      if (!textarea.value.startsWith('•')) {
        textarea.value = `• ${textarea.value}`;
        textarea.selectionStart = textarea.selectionEnd = textarea.value.length;
      }
    }
}
  