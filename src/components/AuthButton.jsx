import { signInWithGoogle, signOut } from '../utilities/firebase';
import "./AuthButton.css";

const SignInButton = ({ open }) => (
  <div className={`auth-button sign-in-button ${open ? "blur" : ""}`} onClick={signInWithGoogle}>Sign In</div>
);

const SignOutButton = ({ open }) => (
  <div className={`auth-button sign-out-button ${open ? "blur" : ""}`} onClick={signOut}>Sign Out</div>
);

const AuthButton = ({ open, user }) => {
  return user ? <SignOutButton open={open}/> : <SignInButton open={open} />;
};

export default AuthButton;
