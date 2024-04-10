import { createContext, PropsWithChildren, useContext } from 'react';
import BaseHttpClient from '@/core/http/BaseHttpClient.ts';
import AxiosClient from '@/core/http/AxiosClient.ts';
import useToast from '@/core/feedback/useToast.ts';

const HttpClientContext = createContext<BaseHttpClient>(null!)

export function HttpClientProvider({ children }: PropsWithChildren) {
  const toast = useToast()
  const client = new AxiosClient({
    baseUrl: 'https://jsonplaceholder.typicode.com',
    timeout: 3000,
  })

  client.addRequestInterceptor(config => {
    const token = 'fakewotken'
    config.headers.Authorization = 'Bearer ' + token
    return config
  })

  client.addResponseInterceptor(response => {
    if (response.status >= 400) {
      toast.open('Something went wrong', 'error')
    }
    return response
  })

  return (
    <HttpClientContext.Provider value={client}>
      {children}
    </HttpClientContext.Provider>
  )
}

export function useHttpClient() {
  return useContext(HttpClientContext)
}