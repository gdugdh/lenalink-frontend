import { redirect } from 'next/navigation';
import { getSession } from './auth';

/**
 * Redirects authenticated users to their dashboard
 * Used in auth pages to prevent logged-in users from accessing login/register
 */
export async function redirectIfAuthenticated(): Promise<void> {
  const session = await getSession();
  if (session?.user?.role) {
    redirect(`/dashboard/${session.user.role}`);
  }
}

