import { useMutation } from '@tanstack/react-query';
import { signInRequest } from '@/apis/auth';
import { toast } from 'sonner'; // Import from sonner

export const useSignin = () => {
    const { isPending, isSuccess, error, mutateAsync: signinMutation } = useMutation({
        mutationFn: signInRequest,
        onSuccess: (data) => {
            console.log('Successfully signed in', data);
            toast.success('Successfully signed in! You will be redirected to the home page in a few seconds', {
                style: {
                    backgroundColor: '#D1FAE5', // light green
                    color: 'black'
                }
            });
        },
        onError: (error) => {
            console.error('Failed to sign in', error);
            toast.error(`Failed to sign in: ${error.message}`, {
                style: {
                    backgroundColor: '#FECACA', // light red
                    color: 'black'
                }
            });
        }
    });

    return {
        isPending,
        isSuccess,
        error,
        signinMutation
    };
};
