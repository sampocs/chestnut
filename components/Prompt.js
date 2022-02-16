import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  Dimensions,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Platform
} from "react-native";
import PropTypes from "prop-types";
import Fonts from '../constants/Fonts.js';
import Colors from '../constants/Colors';

/**
 * Borrowed from https://www.npmjs.com/package/react-native-prompt
 * and modified styles
 * @component
 */
export default class Prompt extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
    placeholder: PropTypes.string.isRequired,
    cancelText: PropTypes.string,
    submitText: PropTypes.string,
    cancelButtonStyle: PropTypes.object,
    submitButtonStyle: PropTypes.object,
    cancelButtonTextStyle: PropTypes.object,
    submitButtonTextStyle: PropTypes.object,
    titleStyle: PropTypes.object,
    onChangeText: PropTypes.func,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
  };

  static defaultProps = {
    title: "Title",
    visible: false,
    placeholder: "Placeholder",
    cancelText: "Cancel",
    submitText: "Save",
    cancelButtonStyle: {},
    cancelButtonTextStyle: {},
    submitButtonStyle: {},
    submitButtonTextStyle: {},
    titleStyle: {},
    onChangeText: () => { },
    onSubmit: () => { },
    onCancel: () => { }
  };
  constructor() {
    super();
    this.state = {
      value: ""
    };
  }
  _onChangeText(value) {
    this.setState({
      value: value
    });
    this.props.onChangeText(value);
  }

  _onSubmit() {
    this.props.onSubmit(this.state.value);
    this.setState({ value: "" });
  }

  _onCancel() {
    this.props.onCancel();
    this.setState({ value: "" });
  }
  render() {
    return (
      <Modal
        transparent={false}
        animationType="fade"
        visible={this.props.visible}
        onRequestClose={this._onCancel.bind(this)}>
        <View style={styles.screenOverlay}>
          <View style={styles.dialogPrompt}>
            <Text style={[styles.title, this.props.titleStyle]}>
              {this.props.title}
            </Text>
            <TextInput
              placeholder={this.props.placeholder}
              style={styles.textInput}
              onChangeText={this._onChangeText.bind(this)}
              onSubmitEditing={this._onSubmit.bind(this)}
              autoFocus={true}
              keyboardType={'number-pad'}
            />
            <View style={styles.buttonsOuterView}>
              <View style={styles.buttonsInnerView}>
                <TouchableOpacity
                  style={[
                    styles.button,
                    this.props.cancelButtonStyle
                  ]}
                  onPress={this._onCancel.bind(this)}>
                  <Text
                    style={[
                      styles.cancelButtonText,
                      this.props.cancelButtonTextStyle
                    ]}>
                    {this.props.cancelText}
                  </Text>
                </TouchableOpacity>
                <View style={styles.buttonsDivider} />
                <TouchableOpacity
                  style={[
                    styles.button,
                    this.props.submitButtonStyle
                  ]}
                  onPress={this._onSubmit.bind(this)}>
                  <Text
                    style={[
                      styles.submitButtonText,
                      this.props.submitButtonTextStyle
                    ]}>
                    {this.props.submitText}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  screenOverlay: {
    height: Dimensions.get("window").height,
    backgroundColor: Colors.greenDark,
    opacity: 0.8,
  },
  dialogPrompt: {
    ...Platform.select({
      ios: {
        opacity: 1.0,
        backgroundColor: "white",
        borderRadius: 15
      },
      android: {
        borderRadius: 5,
        backgroundColor: "white"
      }
    }),
    marginHorizontal: 20,
    marginTop: 150,
    padding: 10,

    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 26,
    color: "black",
    fontFamily: Fonts.helvetica,
  },
  textInput: {
    height: 80,
    width: "100%",
    paddingHorizontal: 10,
    textAlignVertical: "bottom",
    margin: 20,
    fontSize: 50,
    fontFamily: Fonts.avenirNext,
    fontWeight: "bold",
    textAlign: "center",
    ...Platform.select({
      ios: {
        borderRadius: 15,
        backgroundColor: "rgba(166, 170, 172, 0.9)"
      },
      android: {}
    })
  },
  buttonsOuterView: {
    flexDirection: "row",
    ...Platform.select({
      ios: {},
      android: {
        justifyContent: "flex-end"
      }
    }),
    width: "100%"
  },
  buttonsDivider: {
    ...Platform.select({
      ios: {
        width: 1,
        backgroundColor: "rgba(0,0,0,0.5)"
      },
      android: {
        width: 20
      }
    })
  },
  buttonsInnerView: {
    flexDirection: "row",
    ...Platform.select({
      ios: {
        borderTopWidth: 0.5,
        flex: 1
      },
      android: {}
    })
  },
  button: {
    flexDirection: "column",
    justifyContent: "center",

    alignItems: "center",
    ...Platform.select({
      ios: { flex: 1 },
      android: {}
    }),
    marginTop: 5,
    padding: 10
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "black"
  },
  submitButtonText: {
    color: Colors.greenDark,
    fontWeight: "600",
    fontSize: 16
  }
});