interface RetryOptions {
  maxAttempts: number;
  delay: number;
  backoff?: number;
}

export async function retry<T>(
  fn: () => Promise<T>,
  options: RetryOptions
): Promise<T> {
  const { maxAttempts, delay, backoff = 2 } = options;
  let lastError: Error;
  
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      if (attempt === maxAttempts) break;
      
      await new Promise(resolve => 
        setTimeout(resolve, delay * Math.pow(backoff, attempt - 1))
      );
    }
  }
  
  throw lastError!;
} 