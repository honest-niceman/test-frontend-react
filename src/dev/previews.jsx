import React from 'react';
import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox';
import {PaletteTree} from './palette';
import ProjectForm from "../components/project/ProjectForm";

const ComponentPreviews = () => {
  return (
    <Previews palette={<PaletteTree/>}>
      <ComponentPreview path="/ProjectForm">
        <ProjectForm/>
      </ComponentPreview>
    </Previews>
  );
};

export default ComponentPreviews;
