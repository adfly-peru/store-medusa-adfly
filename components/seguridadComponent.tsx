import { Text, Stack, Button, TextInput, Box, Space, Title, Divider, Select, Radio, Avatar, Badge, PasswordInput } from '@mantine/core'
import { useDisclosure, useViewportSize } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { ACCOUNT_STEPS, useAccount } from '../context/account-context';
import { useState } from 'react';


const SeguridadComponent = () => {
    
    const { height, width } = useViewportSize();
    const form = useForm({
        initialValues: {
            currentPassword: '',
            newPassword: '',
            confPassword: ''
        },
    });

    const [visible, { toggle }] = useDisclosure(false);
    const [password, setPassword] = useState({campo: ''})
    const [password2, setPassword2] = useState({campo: ''})
    const [validPassword, setValidPassword] = useState({valido: false})
    
    const { updateStep } = useAccount()

    const validation = () => {
        if (password.campo.length > 0) {
            if (password.campo !== password2.campo) {
                console.log('no son iguales');
                setValidPassword({valido: false})
                return 'No coinciden'
            } else {
                console.log('son iguales')
                setValidPassword({valido: true})
            }
        }
    }

    const showError = () => {
        if (password2.campo.length > 0) {
            validation();
        }
    }

    return (
        <Box sx={({ width: width/3 })}>

            <form onSubmit={form.onSubmit((values) => updateStep(ACCOUNT_STEPS.COMPLETED))}>
                <Stack spacing="xs">

                    <Text>Seguridad</Text>
                    <Divider></Divider>

                    <TextInput
                        label="Contraseña Actual"
                        radius="xs"
                        size="sm"
                    />
                    
                    <PasswordInput
                        label='Nueva Contraseña'
                        radius="xs"
                        size="sm"
                        visible={visible}
                        onVisibilityChange={toggle}
                        value={password.campo}
                        onChange={(e) => setPassword({...password, campo: e.target.value})}
                    />

                    <PasswordInput
                        label='Confirmar Contraseña'
                        radius="xs"
                        size="sm"
                        visible={visible}
                        onVisibilityChange={toggle}
                        onChange={(e) => setPassword2({...password2, campo: e.target.value})}
                        onKeyUp={validation}
                        onBlur={validation}
                        error={validPassword.valido ? '' : 'No coinciden'}
                    />
                    
                </Stack>

                <Space h="md" />
                    
                <Button color="gray" fullWidth size="lg" type="submit" disabled={validPassword.valido != true ? true : false}>Actualizar</Button>
            
            </form>
        </Box>
    )
  }
  
  export default SeguridadComponent
  