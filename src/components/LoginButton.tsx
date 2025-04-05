// 'use client';

// import { useState } from 'react';
// import '@farcaster/auth-kit/styles.css';
// import { AuthKitProvider } from '@farcaster/auth-kit';
// import { SignInButton } from '@farcaster/auth-kit';

// export default function LoginButton() {
//     const [authData, setAuthData] = useState(null);
//     const [error, setError] = useState(null);

//     const handleSignIn = async () => {
//         try {
//             // Генеруємо SIWF-повідомлення
//             const siwfMessage = generateSiwfMessage({
//                 domain: window.location.host,
//                 address: '0xUserWalletAddress', // ⚡ Замінити на фактичну адресу користувача
//                 statement: 'Sign in with Farcaster to continue',
//                 uri: window.location.origin
//             });

//             // Користувач підписує це повідомлення (Тут потрібен реальний механізм підпису)
//             const signedMessage = await signMessageWithWallet(siwfMessage); // ⚡ Реалізувати підпис через гаманець

//             // Відправляємо підписане повідомлення на сервер
//             const response = await fetch('/api/auth', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ signedMessage })
//             });

//             if (!response.ok) {
//                 throw new Error('Authentication failed');
//             }

//             const data = await response.json();
//             setAuthData(data);
//         } catch (err) {
//             setError(err.message);
//         }
//     };

//     return (
//         <div>
//             <button onClick={handleSignIn}>Sign in with Farcaster</button>
//             {authData && <pre>{JSON.stringify(authData, null, 2)}</pre>}
//             {error && <p style={{ color: 'red' }}>{error}</p>}
//         </div>
//     );
// }

// // 🔹 Функція підпису (тут потрібна інтеграція з крипто-гаманцем)
// async function signMessageWithWallet(message: string) {
//     // Використовуй Web3.js, ethers.js або іншу бібліотеку для підпису
//     return "signed-message-placeholder"; // Замінити на реальний підпис
// }
