import React, { useState } from "react";
import { Button, StyleSheet, View } from "react-native";
import Dialog from "react-native-dialog";

export default function DialogBox({
    showDialog,
    handleProceed,
    handleCancel
}: {
        showDialog: boolean,
        handleProceed: () => void,
        handleCancel: () => void
}) {


  
  return (
    <View style={styles.container}>
      
      <Dialog.Container visible={showDialog}>
        <Dialog.Title>Email not verified</Dialog.Title>
        <Dialog.Description>
       Proceed to verify your email
        </Dialog.Description>
        <Dialog.Button label="Cancel" onPress={handleCancel} />
        <Dialog.Button label="Proceed" onPress={handleProceed} />
      </Dialog.Container>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});