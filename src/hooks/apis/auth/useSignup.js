import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { signUpRequest } from '@/apis/auth';

export const useSignup = () => {
  const {
    isPending,
    isSuccess,
    error,
    mutateAsync: signupMutation,
  } = useMutation({
    mutationFn: signUpRequest,
    onSuccess: (data) => {
      console.log('Successfully signed up', data);
      toast.success('Successfully signed up', {
        description: 'You will be redirected to the login page in a few seconds',
        style: {
          backgroundColor: '#dcfce7', // light green
          color: 'black',             // black inner text
          border: '1px solid #34d399',
        },
      });
    },
    onError: (error) => {
      console.error('Failed to sign up', error);
      toast.error('Failed to sign up', {
        description: error.message,
        style: {
          backgroundColor: '#fee2e2', // light red
          color: 'black',             // black inner text
          border: '1px solid #f87171',
        },
      });
    },
  });

  return {
    isPending,
    isSuccess,
    error,
    signupMutation,
  };
};
