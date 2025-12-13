import AuthLayout from '@/components/layouts/AuthLayout';
import StyledButton from '@/components/ui/common/StyledButton';
import ChipWithIcon from '@/components/ui/common/ChipWithIcon';
import FormDivider from '@/components/ui/common/FormDivider';
import AuthFooter from '@/components/ui/common/AuthFooter';
import FormField from '@/components/ui/common/FormField';
import TextInput from '@/components/ui/inputs/TextInput';
import { IconDiagram, IconLock, IconMail, IconTrack } from '@/assets/icons';
import { useRouter } from 'expo-router';
import useAuthStore from '../store/authStore';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginFormData } from '@/schemas/auth';
import { StyleSheet } from 'react-native';
import { MotiView } from 'moti';
import { useTranslation } from 'react-i18next';

export default function LoginScreen() {
  const { login, loading } = useAuthStore();
  const router = useRouter();
  const { t } = useTranslation();

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
  });

  const email = watch('email');
  const password = watch('password');

  const onSubmit = (data: LoginFormData) => {
    login(data);
  };

  return (
    <AuthLayout title={t('auth.login.title')}>
      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 500, delay: 400 }}
        style={styles.icons}>
        <ChipWithIcon
          text={t('auth.login.trackExpenses')}
          icon={<IconTrack />}
          style={{ backgroundColor: '#EEF2FF' }}
          textStyle={{ color: '#432DD7' }}
        />
        <ChipWithIcon
          text={t('auth.login.smartInsights')}
          icon={<IconDiagram />}
          style={{ backgroundColor: '#FAF5FF' }}
          textStyle={{ color: '#9810FA' }}
        />
      </MotiView>

      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 500, delay: 500 }}
        style={styles.inputs}>
        <FormField error={errors.email?.message ? t(errors.email.message) : undefined}>
          <TextInput
            placeholder={t('auth.login.emailPlaceholder')}
            value={email}
            onChangeText={text => setValue('email', text, { shouldValidate: true })}
            keyboardType="email-address"
            startIcon={<IconMail />}
          />
        </FormField>

        <FormField error={errors.password?.message ? t(errors.password.message) : undefined}>
          <TextInput
            placeholder={t('auth.login.passwordPlaceholder')}
            value={password}
            onChangeText={text => setValue('password', text, { shouldValidate: true })}
            startIcon={<IconLock />}
            secureTextEntry
          />
        </FormField>
      </MotiView>
      <MotiView
        from={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'timing', duration: 400, delay: 600 }}>
        <StyledButton
          title={t('auth.login.loginButton')}
          onPress={handleSubmit(onSubmit)}
          style={styles.button}
          loading={loading}
        />
      </MotiView>

      <MotiView
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: 'timing', duration: 400, delay: 700 }}>
        <FormDivider />
      </MotiView>

      <MotiView
        from={{ opacity: 0, translateY: 10 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 400, delay: 800 }}>
        <AuthFooter
          text={t('auth.login.noAccount')}
          linkText={t('auth.login.registerLink')}
          onLinkPress={() => router.push('/register')}
        />
      </MotiView>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  icons: {
    flexDirection: 'row',
    gap: 8,
    marginVertical: 14,
  },
  inputs: {
    gap: 16,
    marginTop: 8,
  },
  button: {
    marginTop: 18,
    marginBottom: 20,
  },
});
