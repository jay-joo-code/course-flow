import React from "react";
import { Space } from "src/components/layout";
import Text from "src/components/text";
import styled from "styled-components";

interface UtilityInputGroupProps {
  formik: any;
}

const Container = styled.div``;

const UtilityInputGroup = ({ formik }: UtilityInputGroupProps) => {
  return (
    <>
      <Text variant="h3">Utilities</Text>
      <Space margin="2rem 0" />
    </>
  );
};

export default UtilityInputGroup;
