/**
 * Firebase Connection Diagnostics Utility
 * Run `checkFirebaseConnection()` in the browser console to check Firebase connection status
 */

export async function checkFirebaseConnection() {
  const diagnostics = {
    timestamp: new Date().toISOString(),
    environment: {
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ? '✅ Set' : '❌ Missing',
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY ? '✅ Set' : '❌ Missing',
      mode: import.meta.env.MODE,
      dev: import.meta.env.DEV,
    },
    connection: {},
    errors: []
  };

  try {
    const { db } = await import('../lib/firebase.ts');
    const { collection, getDocs, limit, query } = await import('firebase/firestore');

    diagnostics.connection.clientInitialized = '✅ Yes';

    // Test a simple query to see if Firestore is accessible
    try {
      const q = query(collection(db, 'works'), limit(1));
      const querySnapshot = await getDocs(q);

      diagnostics.connection.testQuery = '✅ Success';
      diagnostics.connection.worksCount = querySnapshot.empty ? 0 : querySnapshot.docs.length;
    } catch (queryError) {
      diagnostics.connection.testQuery = '❌ Failed';
      diagnostics.errors.push({
        type: 'Query Error',
        message: queryError.message,
        code: queryError.code
      });
    }

  } catch (err) {
    diagnostics.connection.clientInitialized = '❌ No';
    diagnostics.errors.push({
      type: 'Initialization/Import Error',
      message: err.message,
    });
  }

  // Print formatted results
  console.group('🔍 Firebase Connection Diagnostics');
  console.log('Environment:', diagnostics.environment);
  console.log('Connection:', diagnostics.connection);
  if (diagnostics.errors.length > 0) {
    console.error('Errors:', diagnostics.errors);
  } else {
    console.log('✅ No errors detected');
  }
  console.groupEnd();

  return diagnostics;
}

// Make it available globally for browser console access
if (typeof window !== 'undefined') {
  window.checkFirebaseConnection = checkFirebaseConnection;
}
