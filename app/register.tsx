import AuthLayout from '@/components/layouts/AuthLayout';
import StyledButton from '@/components/ui/common/StyledButton';
import ChipWithIcon from '@/components/ui/common/ChipWithIcon';
import FormDivider from '@/components/ui/common/FormDivider';
import AuthFooter from '@/components/ui/common/AuthFooter';
import FormField from '@/components/ui/common/FormField';
import TextInput from '@/components/ui/inputs/TextInput';
import { IconLock, IconMail, IconProfile, IconSecure, IconStars } from '@/assets/icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import useAuthStore from '../store/authStore';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, RegisterFormData } from '@/schemas/auth';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { MotiView } from 'moti';
import { useTranslation } from 'react-i18next';

export default function RegisterScreen() {
  const { register, loading } = useAuthStore();
  const router = useRouter();
  const { t } = useTranslation();
  const { invitationToken } = useLocalSearchParams<{ invitationToken?: string }>();

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
    mode: 'onBlur',
  });

  const name = watch('name');
  const email = watch('email');
  const password = watch('password');

  const onSubmit = (data: RegisterFormData) => {
    register({ ...data, invitationToken });
  };

  return (
    <AuthLayout title={t('auth.register.title')}>
      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 500, delay: 400 }}
        style={styles.icons}>
        <ChipWithIcon
          text={t('auth.register.secure')}
          icon={<IconSecure />}
          style={{ backgroundColor: '#FAF5FF' }}
          textStyle={{ color: '#9810FA' }}
        />
        <ChipWithIcon
          text={t('auth.register.aiPowered')}
          icon={<IconStars />}
          style={{ backgroundColor: '#FDF2F8' }}
          textStyle={{ color: '#C6005C' }}
        />
      </MotiView>

      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 500, delay: 500 }}
        style={styles.inputs}>
        <FormField error={errors.name?.message ? t(errors.name.message) : undefined}>
          <TextInput
            placeholder={t('auth.register.namePlaceholder')}
            value={name}
            onChangeText={text => setValue('name', text, { shouldValidate: true })}
            startIcon={<IconProfile size={18} color="#99A1AF" />}
          />
        </FormField>

        <FormField error={errors.email?.message ? t(errors.email.message) : undefined}>
          <TextInput
            placeholder={t('auth.register.emailPlaceholder')}
            value={email}
            onChangeText={text => setValue('email', text, { shouldValidate: true })}
            keyboardType="email-address"
            startIcon={<IconMail />}
          />
        </FormField>

        <FormField error={errors.password?.message ? t(errors.password.message) : undefined}>
          <TextInput
            placeholder={t('auth.register.passwordPlaceholder')}
            value={password}
            onChangeText={text => setValue('password', text, { shouldValidate: true })}
            startIcon={<IconLock />}
            secureTextEntry
          />
        </FormField>
      </MotiView>

      <MotiView
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: 'timing', duration: 400, delay: 600 }}>
        <Text style={styles.terms}>{t('auth.register.terms')}</Text>
      </MotiView>

      <MotiView
        from={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'timing', duration: 400, delay: 700 }}>
        <StyledButton
          title={t('auth.register.createButton')}
          onPress={handleSubmit(onSubmit)}
          style={styles.button}
          color="secondary"
          loading={loading}
        />
      </MotiView>

      <MotiView
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: 'timing', duration: 400, delay: 800 }}>
        <FormDivider />
      </MotiView>

      <MotiView
        from={{ opacity: 0, translateY: 10 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 400, delay: 900 }}>
        <AuthFooter
          text={t('auth.register.hasAccount')}
          linkText={t('auth.register.loginLink')}
          onLinkPress={() => router.push('/login')}
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
  terms: {
    fontSize: 10,
    color: '#99A1AF',
    marginTop: 12,
  },
  button: {
    marginTop: 18,
    marginBottom: 20,
  },
});
