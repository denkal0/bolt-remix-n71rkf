import { ActionFunction, json } from '@remix-run/node';
import { loginUser } from '~/models/user.server';

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return json({ error: 'Email and password are required' }, { status: 400 });
  }

  const result = await loginUser(email, password);
  
  if (result.error) {
    return json({ error: result.error }, { status: 400 });
  }

  // Return user data
  return json({ userName: result.name, userId: result.userId });
};