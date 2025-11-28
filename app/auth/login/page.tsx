import { redirect } from 'next/navigation';
import { redirectIfAuthenticated } from '@/app/lib/auth-utils';

export default async function LoginPage() {
  // Redirect if already authenticated
  await redirectIfAuthenticated();
  
  // Redirect to home page with login modal parameter
  redirect('/?modal=login');
}

