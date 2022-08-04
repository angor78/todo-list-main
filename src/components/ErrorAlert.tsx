import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";

type ErrorAlertType = {
  error: string | null
}

export function ErrorAlert(props: ErrorAlertType) {


  return (

    <Alert status='error' justifyContent={'center'}>
      <AlertIcon/>
      <AlertTitle>Error!</AlertTitle>
      <AlertDescription>{props.error}</AlertDescription>
    </Alert>

  )
}