import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { toast } from 'react-hot-toast';

interface SignUpProps {
  onFlip: () => void;
}

const SignUp = ({ onFlip }: SignUpProps) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      await updateProfile(userCredential.user, {
        displayName: formData.name
      });

      toast.success('Account created successfully!');
      navigate('/');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="backdrop-blur-xl bg-[#202123]/80 rounded-3xl shadow-2xl p-12 
                    border border-white/20 w-full h-full relative z-10">
      <h2 className="text-4xl font-bold text-white text-center mb-8">
        Create Account
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full px-5 py-3.5 bg-white/5 border border-white/10 rounded-xl
                   text-white placeholder-white/50 focus:outline-none focus:border-[#10A37F]
                   text-lg transition-all"
          required
        />
        
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full px-5 py-3.5 bg-white/5 border border-white/10 rounded-xl
                   text-white placeholder-white/50 focus:outline-none focus:border-[#10A37F]
                   text-lg transition-all"
          required
        />
        
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full px-5 py-3.5 bg-white/5 border border-white/10 rounded-xl
                   text-white placeholder-white/50 focus:outline-none focus:border-[#10A37F]
                   text-lg transition-all"
          required
        />

        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
          className="w-full px-5 py-3.5 bg-white/5 border border-white/10 rounded-xl
                   text-white placeholder-white/50 focus:outline-none focus:border-[#10A37F]
                   text-lg transition-all"
          required
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3.5 bg-[#10A37F] text-white rounded-xl hover:bg-[#0D8E6C]
                   transition-colors disabled:opacity-50 text-lg font-medium"
        >
          {isLoading ? 'Creating Account...' : 'Sign Up'}
        </button>
      </form>

      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/10"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-[#202123] text-white/50">
            Or continue with
          </span>
        </div>
      </div>

      <button
        className="w-full py-3.5 bg-white/5 text-white rounded-xl hover:bg-white/10
                 transition-colors flex items-center justify-center gap-3 text-lg font-medium
                 border border-white/10"
      >
        <svg className="w-6 h-6" viewBox="0 0 24 24">
          {/* Google icon paths */}
        </svg>
        Sign up with Google
      </button>

      <div className="mt-8 text-center text-white">
        <p className="text-white/70">
          Already have an account?{' '}
          <button 
            onClick={onFlip}
            className="text-[#10A37F] hover:text-[#0D8E6C] transition-colors font-medium"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUp; 