import { redirect } from 'next/navigation';

export default function LoginPage() {
  // Redirect to home page with login modal parameter
  redirect('/?modal=login');
}

