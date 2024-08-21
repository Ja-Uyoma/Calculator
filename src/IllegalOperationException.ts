class IllegalOperationException extends Error {
  /**
   * Get the error message describing the exception that occured
   * @returns {string} An message describing the error that occured
   */
  what(): string {
    return this.message;
  }
}

export default IllegalOperationException;
