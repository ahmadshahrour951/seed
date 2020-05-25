import { required, email } from 'vee-validate/dist/rules';
import { extend } from 'vee-validate';

extend('required', {
  ...required,
  message: 'This field is required',
});

extend('email', {
  ...email,
  message: 'This field must be a valid email',
});

extend('password', {
  validate(value) {
    return value.match(
      /^(?=.*[\d]+.*)(?=.*[\w]+.*)(?=.*[.\S]+.*)[\d\w\S]{8,30}$/
    );
  },
  message:
    'Password must contain at least one letter, at least one number, and be longer than 8 characters.',
});

extend('confirm_password', {
  validate(value, args) {
    return value === args.password;
  },
  params: ['password'],
  message: 'Passwords do not match!',
});
