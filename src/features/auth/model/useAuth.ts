import { useMutation } from '@tanstack/react-query'
import { tokenStorage } from '../../../shared/lib/api/tokenStorage';
import { login, IAuthResponse } from '../api/login'
import { ILoginFormInputs } from '../ui/LoginForm';

export const useAuth = () => {
  const mutation = useMutation<IAuthResponse, Error, ILoginFormInputs>({
    mutationFn: (payload: ILoginFormInputs) => {
			const {username, password} = payload;
			return login(username, password)
		},

    onSuccess: (data, variables) => {
			const {remember} = variables;
			const {accessToken} = data;
			tokenStorage.setAccessToken(accessToken, remember);
    }
  })

	return mutation;
}