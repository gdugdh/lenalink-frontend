import { redirect } from 'next/navigation';

export default function RegisterPage() {
  // Redirect to home page with register modal parameter
  redirect('/?modal=register');
}
