'use client'
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { RegisterSchema, registerField } from './form-data';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { TRole } from '../types';
import { authSubmit } from '../backend/un-auth';
import PasswordField from '../ui/password';
import Input from '../ui/input';
import { RotateCw } from 'lucide-react';
import Button from '../ui/button';

const RegisterForm = ({ role }: TRole) => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(RegisterSchema),
    mode: "onChange",
  });

  const { isPending, mutate } = useMutation({
    mutationFn: authSubmit,
    onSuccess: () => {
      router.replace(`/auth/signin/${role}`);
      toast.success(
        "A verification email has been sent. Please check your inbox."
      );
    },
  });

  return (
    <>
      <form
        noValidate
        className="form"
        onSubmit={handleSubmit((formData) => {
          mutate({ formData, role, type: "register" });
        })}
      >
        {registerField.map((field) => (
          <div className="space-y-2" key={field.name}>
            {field.type === "password" ? (
              <PasswordField
                key={field.name}
                label={field.label}
                name={field.name}
                register={register}
                error={errors[field.name]?.message?.toString()}
              />
            ) : (
              <Input
                key={field.name}
                label={field.label}
                name={field.name}
                type={field.type}
                focus={field.name === "username"}
                register={register}
                error={errors[field.name]?.message?.toString()}
              />
            )}
          </div>
        ))}
        <div className="text-center">
          <Button
            disabled={isPending}
            className='w-1/2'
          >
            {isPending ? (
              <>
                <RotateCw className="rotate" />
                <span className="animate-pulse">Creating ...</span>
              </>
            ) : (
              "Create"
            )}
          </Button>
        </div>
      </form>
    </>
  );
};

export default RegisterForm