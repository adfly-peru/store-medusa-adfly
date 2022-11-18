import { Text, Stack, Button, TextInput, Box, Space, Title, Divider, Select, Radio, Avatar, Badge, PasswordInput } from '@mantine/core'
import { useViewportSize } from '@mantine/hooks';
import { useForm } from '@mantine/form';


const SeguridadComponent = () => {
    const { height, width } = useViewportSize();
    const form = useForm({
        initialValues: {
            email: '',
            cellphone: '',
            workplace: ''
        },
    });

    return (
        <Box sx={({ width: width/3 })}>

            <form onSubmit={form.onSubmit((values) => console.log(values))}>
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
                    />

                    <PasswordInput
                        label='Confirmar Contraseña'
                        radius="xs"
                        size="sm"
                    />
                    
                </Stack>

                <Space h="md" />
                    
                <Button color="gray" fullWidth size="lg" type="submit">Actualizar</Button>
            
            </form>
        </Box>
    )
  }
  
  export default SeguridadComponent
  