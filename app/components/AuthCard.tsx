import React, { useState } from "react";
import { Form, useTransition } from "@remix-run/react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface AuthCardProps {
  onClose: () => void;
  onLoginSuccess: () => void;
}

const AuthCard = ({ onClose, onLoginSuccess }: AuthCardProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const transition = useTransition();
  const isSubmitting = transition.state === "submitting";

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-card border border-border rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-playfair font-bold text-foreground mb-4">
          {isLogin ? "Login" : "Sign Up"} to Continue
        </h2>

        <Form
          method="post"
          action={isLogin ? "/_thop_.login" : "/_thop_.register"}
          className="space-y-4"
        >
          {!isLogin && (
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                required
              />
            </div>
          )}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="john@example.com"
              required
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" required />
          </div>
          {!isLogin && (
            <>
              <div>
                <Label htmlFor="street">Street Address</Label>
                <Input
                  id="street"
                  name="street"
                  type="text"
                  placeholder="123 Main St"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    name="city"
                    type="text"
                    placeholder="Hyderabad"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="postalCode">Postal Code</Label>
                  <Input
                    id="postalCode"
                    name="postalCode"
                    type="text"
                    placeholder="500001"
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="state">State</Label>
                <Input
                  id="state"
                  name="state"
                  type="text"
                  placeholder="Telangana"
                  required
                />
              </div>
              <div>
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  name="country"
                  type="text"
                  placeholder="India"
                  required
                />
              </div>
            </>
          )}
          <input
            type="hidden"
            name="_action"
            value={isLogin ? "login" : "register"}
          />
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Processing..." : isLogin ? "Login" : "Sign Up"}
          </Button>
        </Form>

        {/* SSO Buttons */}
        <div className="mt-4">
          <p className="text-center text-sm text-muted-foreground mb-2">
            Or continue with
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() =>
                (window.location.href = "/_thop_.login?provider=google")
              }
            >
              Google
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={() =>
                (window.location.href = "/_thop_.login?provider=facebook")
              }
            >
              Facebook
            </Button>
          </div>
        </div>

        <div className="mt-4 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-primary hover:underline"
          >
            {isLogin
              ? "Need an account? Sign Up"
              : "Already have an account? Login"}
          </button>
        </div>

        <Button variant="ghost" onClick={onClose} className="mt-4 w-full">
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default AuthCard;
