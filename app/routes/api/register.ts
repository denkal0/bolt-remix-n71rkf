import { ActionFunction, json } from '@remix-run/node';
import { createUser } from '~/models/user.server';

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!name || !email || !password) {
    return json({ error: 'All fields are required' }, { status: 400 });
  }

  return createUser(name, email, password);
};