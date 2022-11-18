import { Text, Stack, Button, TextInput, Box, Space, Title, Divider, Select, Radio, Avatar, Badge } from '@mantine/core'
import { useViewportSize } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/router';
import { ACCOUNT_STEPS, useAccount } from '../context/account-context';


const DatosPersonalesComponent = () => {
    const { height, width } = useViewportSize();
    const form = useForm({
        initialValues: {
            email: '',
            cellphone: '',
            workplace: ''
        },
    });

    const { updateStep } = useAccount()

    return (
        <Box sx={({ width: width/3 })}>

            <form onSubmit={form.onSubmit((values) => updateStep(ACCOUNT_STEPS.PROFFILECOMPLETED))}>
                <Stack spacing="xs">

                    <Text>Perfil</Text>
                    <Divider></Divider>
                    <Text>Datos Personales</Text>
                    
                    <TextInput
                        placeholder="Colaborador Colaborador"
                        label="Nombre Completo"
                        radius="xs"
                        size="sm"
                        disabled
                        withAsterisk
                    />

                    <TextInput
                        placeholder="DNI"
                        label="Tipo Documento"
                        radius="xs"
                        size="sm"
                        disabled
                        withAsterisk
                    />

                    <TextInput
                        placeholder="77777777"
                        label="Nro. Documento"
                        radius="xs"
                        size="sm"
                        disabled
                        withAsterisk
                    />

                    <TextInput
                        placeholder=""
                        label="Correo Electrónico"
                        radius="xs"
                        size="sm"
                        withAsterisk
                    />

                    <TextInput
                        placeholder=""
                        label="Celular"
                        radius="xs"
                        size="sm"
                        withAsterisk
                    />

                <Space h="md" />

                    <Text>Dirección de Centro de Trabajo</Text>

                    <Select
                        label='Sede de Trabajo'
                        placeholder='Seleccione uno' 
                        data={[
                            {value: 'Sede1', label: 'Sede1'},
                            {value: 'Sede2', label: 'Sede2'},
                            {value: 'Sede3', label: 'Sede3'}
                        ]}
                        withAsterisk
                    />

                    <TextInput
                        placeholder="Jr. Dirección N°251"
                        label="Dirección de Sede"
                        radius="xs"
                        size="sm"
                        disabled
                    />

                    <Space h="md" />


                    <Radio
                        label='Acepto los términos y condiciones' 
                    />

                    <Radio
                        label='Acepto recibir publicidad' 
                    />
                    
                </Stack>

                <Space h="md" />
                    
                <Button color="gray" fullWidth size="lg" type="submit">Actualizar</Button>
            
            </form>
        </Box>
    )
  }
  
  export default DatosPersonalesComponent
  