
import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
} from '@mantine/core';
import axios from 'axios';
import { BASEURL } from '@/config';

export default function Login(props: PaperProps) {
  const [type, toggle] = useToggle(['login', 'register']);

  const form = useForm({
    initialValues: {
      username: 'jaipataka',
      name: '',
      password: 'JLP@iskcon',
      terms: true,
    },

    validate: {
      password: (val:string) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
    },
  });
  console.log(type)
  const handleLogin = (values:any) =>{
    console.log({
      "username":values.username,
      "password":values.password
  },)
    axios.post(`${BASEURL}/user/login/`, 
    {
      "username":values.username,
      "password":values.password
  },
                {headers: {
                    "Content-Type": "application/json",},
                })
    .then(res => {
      console.log(res);
      console.log(res.data);
      localStorage.setItem('token',res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data));
    })
    .catch(err => {
      console.error(err);
      
    })
  }
  return (
    <Paper radius="md" p="xl" pt={0} {...props}>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <form onSubmit={form.onSubmit((values) => {handleLogin(values); })}>
        <Stack>
          {type === 'register' && (
            <TextInput
              label="Name"
              placeholder="Your name"
              value={form.values.name}
              onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
              radius="md"
            />
          )}

          <TextInput
            required
            label="Username"
            placeholder="hello"
            value={form.values.username}
            onChange={(event) => form.setFieldValue('username', event.currentTarget.value)}
            radius="md"
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
            error={form.errors.password && 'Password should include at least 6 characters'}
            radius="md"
          />

          {type === 'register' && (
            <Checkbox
              label="I accept terms and conditions"
              checked={form.values.terms}
              onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
            />
          )}
        </Stack>

        <Group position="apart" mt="xl">
          <Anchor
            component="button"
            type="button"
            color="dimmed"
            onClick={() => toggle()}
            size="xs"
          >
            {type === 'register'
              ? 'Already have an account? Login'
              : "Don't have an account? Register"}
          </Anchor>
          <Button type="submit" radius="md" color='blue.7'>
            {upperFirst(type)}
          </Button>
        </Group>
      </form>
    </Paper>
  );
}

