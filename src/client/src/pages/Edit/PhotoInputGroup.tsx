import React from "react";
import { Space } from "src/components/layout";
import Text from "src/components/text";
import styled from "styled-components";

interface PhotoInputGroupProps {
  formik: any;
}

const Container = styled.div``;

const PhotoInputGroup = ({ formik }: PhotoInputGroupProps) => {
  return (
    <>
      <Text variant="h3">Photos</Text>
      <Space margin="2rem 0" />
    </>
  );
};

export default PhotoInputGroup;
