import { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';

export default function NotificationHandler() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace("/");
    }, 3000);

    //return () => clearTimeout(timeout);
  }, []);

}
