import { redirect } from 'next/navigation';
import { getSession } from '@/app/lib/auth';

export default async function RegisterPage() {
  // Check if user is already authenticated
  const session = await getSession();
  
  // If authenticated, redirect to their dashboard
  if (session?.user?.role) {
    redirect(`/dashboard/${session.user.role}`);
  }
  
  // Redirect to home page with register modal parameter
  redirect('/?modal=register');
}
