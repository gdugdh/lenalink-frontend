import { redirect } from 'next/navigation';
import { redirectIfAuthenticated } from '@/app/lib/auth-utils';

export default async function RegisterPage() {
  // Redirect if already authenticated
  await redirectIfAuthenticated();
  
  // Redirect to home page with register modal parameter
  redirect('/?modal=register');
}
