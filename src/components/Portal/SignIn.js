import React, { useState } from "react";
import {
  Container,
  FormWrap,
  Icon,
  FormContent,
  Form,
  FormH1,
  FormLabel,
  FormInput,
  FormButton,
  // Button,
  // Panel,
} from "./Styled";
import { signIn } from "../../axios/authServices";
import { useGlobalState } from "../../utils/stateContext";


export default function SignIn({history}) {
	const initialFormState = {
		email: '',
		password: ''
	}
	const [formState, setFormState] = useState(initialFormState)
	const {dispatch} = useGlobalState()
  const isEnabled =	formState.email.length > 0 && 
                    formState.password.length > 0;


	function handleChange(e) {
		setFormState({
			...formState,
			[e.target.name]: e.target.value
		})
	}
	function handleSubmit(e) {
		e.preventDefault()
		signIn(formState)
		.then(({username, jwt}) => {
			sessionStorage.setItem("token", jwt) // setItem allows a key and a value 
			sessionStorage.setItem("user", username)
			dispatch({type: 'setLoggedInUser', data: username})
			dispatch({type: 'setToken', data: jwt})
			history.push('/portal')
		})
		.catch(err => { 
			setFormState({errorMessage: err.message})
		})

	}
	return (
	<>
		<Container>
			<FormWrap>
				<Icon to="../">D & L Constructions</Icon>
				<FormContent>
					<Form action="#">
						<FormH1>Employee Login:</FormH1>
						<FormLabel htmlFor="for">Email</FormLabel>
						<FormInput type='email' name='email' value={formState.username} onChange={handleChange}></FormInput>
						<FormLabel htmlFor="for">Password:</FormLabel>
						<FormInput type='password' name='password' value={formState.password} onChange={handleChange}></FormInput>
						<FormButton disabled={!isEnabled} onClick={handleSubmit}>Log in</FormButton>
						<div>
							<Panel>
              	<Button onClick={() => history.push(`/portal`)}>
                	Back
              	</Button>
            	</Panel>
          </div>
					</Form>
				</FormContent>
			</FormWrap>
		</Container>
	</>
	)
              <div>
                <br />
                {formState.errorMessage && (
                  <h3 className="error" style={{ color: "white" }}>
                    {" "}
                    {"Oops! Please check your details and try again"}{" "}
                  </h3>
                )}
              </div>
            </Form>
          </FormContent>
        </FormWrap>
      </Container>
    </>
  );
}
