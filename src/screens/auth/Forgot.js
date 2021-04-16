import React, { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import {
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import * as theme from "../../constants/theme.js";
import {Block,Text,Input,ErrorMessage,Button} from "../../components/Index.js";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
});

export default Forgot = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState(true);

  const onSubmitEmail=(values)=>{
    setEmail(values.email)
    setLoading(!loading)
} 

  return (
    <KeyboardAwareScrollView
      style={{ marginVertical: 10 }}
      showsVerticalScrollIndicator={false}
    >
      <KeyboardAvoidingView style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Block center middle>
            <Block style={{ marginTop: 20 }}>
              <Image
                source={require("../../assets/icons/scooter.png")}
                style={{ height: 100, width: 100 }}
              />
            </Block>
            <Block flex={2.5} center>
              <Text h3 style={{ marginBottom: 6 }} color={theme.colors.maroon}>
                Please enter your credentials
              </Text>
              <Block center style={{ marginTop: 44 }}>
                <Formik
                  initialValues={{ email: "",}}
                  onSubmit={(values) => onSubmitEmail(values)}
                  validationSchema={validationSchema}
                >
                  {({
                    handleChange,
                    touched,
                    setFieldTouched,
                    handleSubmit,
                    values,
                    errors,
                  }) => (
                    <Block>
                      
                       <Input
                        full
                        email
                        autoFocus={true}
                        label="Email address"
                        style={{ marginBottom: 5 }}
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={handleChange("email")}
                        onBlur={() => setFieldTouched("email")}
                        value={values.email}
                      />
                      <ErrorMessage
                        error={errors.email}
                        visible={touched.email}
                      />

                      {(!errors.email ) ? 
                        <Button
                        full
                        style={{
                          marginBottom: 12,
                        }}
                        onPress={handleSubmit}
                      >
                          {loading ? (
                          <ActivityIndicator
                            size="small"
                            color={theme.colors.white}
                          />
                        ) : (
                        <Text button>Send email</Text>

                        )}
                      </Button> : 

                    <Button
                        full
                        style={{
                          marginBottom: 12,
                          backgroundColor: theme.colors.gray,
                        }}
                        disabled={true}
                      >
                          <Text button>Send</Text>
                      </Button>
                    }
                     
                      <Block center>
                        <Text h4 color="black">
                          Already have an account?{" "}
                          <Text
                            h4
                            height={18}
                            color={theme.colors.maroon}
                            onPress={() => navigation.navigate("Login")}
                          >
                            Login
                          </Text>
                        </Text>
                      </Block>
                    </Block>
                  )}
                </Formik>
              </Block>
            </Block>
          </Block>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </KeyboardAwareScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

