import { useState } from 'react';
import { Form, useActionData, useSubmit, Link, useNavigate } from '@remix-run/react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface NavbarProps {
  showLogin?: boolean;
  setShowLogin?: (show: boolean) => void;
  isLoggedIn?: boolean;
  userName?: string;
}

export function Navbar({ showLogin, setShowLogin, isLoggedIn, userName }: NavbarProps) {
  const [showSignup, setShowSignup] = useState(false);
  const actionData = useActionData();
  const submit = useSubmit();
  const navigate = useNavigate();

  const toggleLogin = () => {
    setShowLogin && setShowLogin(!showLogin);
    setShowSignup(false);
  };

  const toggleSignup = () => {
    setShowSignup(!showSignup);
    setShowLogin && setShowLogin(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    submit(form, { replace: true });
  };

  return (
    <>
      <nav className="bg-primary p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-primary-foreground font-bold text-xl">WorkFlow</div>
          {isLoggedIn ? (
            <div className="flex items-center">
              <Link to="/user" className="text-primary-foreground mr-4 hover:text-secondary">Home</Link>
              <Link to="/user/hours" className="text-primary-foreground mr-4 hover:text-secondary">Hours</Link>
              <Link to="/user/report" className="text-primary-foreground mr-4 hover:text-secondary">Report</Link>
              <span className="text-primary-foreground mr-4">Welcome, {userName}</span>
              <Button className="bg-accent hover:bg-accent/90">Logout</Button>
            </div>
          ) : (
            <div>
              <Button onClick={toggleLogin} className="mr-2 bg-secondary hover:bg-secondary/90">Login</Button>
              <Button onClick={toggleSignup} className="bg-accent hover:bg-accent/90">Sign Up</Button>
            </div>
          )}
        </div>
      </nav>

      {showLogin && !isLoggedIn && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <Card className="w-[350px] bg-card">
            <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
              <CardTitle>Login</CardTitle>
              <CardDescription className="text-primary-foreground/80">Enter your credentials to login</CardDescription>
            </CardHeader>
            <CardContent className="mt-4">
              <Form method="post" action="/api/login" onSubmit={handleSubmit}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" placeholder="Enter your email" required />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" name="password" type="password" placeholder="Enter your password" required />
                  </div>
                </div>
                {actionData?.error && <p className="text-sm text-center mt-2 text-destructive">{actionData.error}</p>}
                <CardFooter className="flex justify-between mt-4">
                  <Button type="button" variant="outline" onClick={() => setShowLogin && setShowLogin(false)}>Cancel</Button>
                  <Button type="submit" className="bg-accent hover:bg-accent/90">Login</Button>
                </CardFooter>
              </Form>
            </CardContent>
            <div className="text-center pb-4">
              <span className="text-sm">No account? </span>
              <Button variant="link" onClick={toggleSignup} className="text-secondary">Sign Up</Button>
            </div>
          </Card>
        </div>
      )}

      {/* Signup form remains unchanged */}
    </>
  );
}