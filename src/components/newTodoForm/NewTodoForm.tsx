import React, { useState } from 'react';
import styled from 'styled-components';

import { ICategory, INewCategoryTodo, TNewTodoText } from '../../interfaces';
import { maxLength, required } from '../validators/validators';
import { InputField } from '../Form/InputField';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';

const Form = styled.form`
  display: flex;
  justify-content: center;
  .filledArea {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
    z-index: 1;
  }
  .card {
    position: absolute;
    margin: 0px auto;
    top: 30vh;
    width: 385px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    z-index: 2;
  }
  .formControl {
    width: 100%;
    margin-bottom: 20px;
  }
  .button {
    align-self: center;
  }
  .field {
    margin-bottom: 20px;
  }
`;

interface NewTodoFormProps {
  categories: Array<ICategory>;
  createTodo(newCategoryTodo: INewCategoryTodo): void;
  toggleForm(): void;
}

export const NewTodoForm: React.FC<NewTodoFormProps> = ({
  categories,
  createTodo,
  toggleForm,
}) => {
  const NEWCATEGORY = 'Новая категория';
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isValidForm, setIsValidForm] = useState({
    todoText: false,
    categoryName: false,
  });
  const [newTodoText, setNewTodoText] = useState({
    categoryName: '',
    todoText: '',
  });

  const selectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const value = event.target.value as string;
    setSelectedCategory(value);
  };

  const handleSubmit = () => {
    selectedCategory === NEWCATEGORY
      ? createTodo({
          title: newTodoText.categoryName,
          text: newTodoText.todoText,
        })
      : createTodo({ title: selectedCategory, text: newTodoText.todoText });
    toggleForm();
  };

  const inputChange = (fieldName: string) => (fieldValue: string) => {
    setNewTodoText({ ...newTodoText, [fieldName]: fieldValue });
  };

  const setValidForm = (fieldName: TNewTodoText) => (isValid: boolean) => {
    setIsValidForm({ ...isValidForm, [fieldName]: isValid });
  };

  const disabledButton = () => {
    return !(
      isValidForm.todoText &&
      (selectedCategory !== NEWCATEGORY || isValidForm.categoryName)
    );
  };

  return (
    <Form>
      <div onClick={() => toggleForm} className="filledArea"></div>
      <Card className="card">
        {selectedCategory === NEWCATEGORY && (
          <InputField
            className="field"
            label={'Название категории'}
            value={newTodoText.categoryName}
            inputChange={inputChange('categoryName')}
            validators={[required, maxLength(30)]}
            setValidForm={setValidForm('categoryName')}
          />
        )}
        <InputField
          className="field"
          label={'Название задачи'}
          value={newTodoText.todoText}
          inputChange={inputChange('todoText')}
          validators={[required, maxLength(30)]}
          setValidForm={setValidForm('todoText')}
        />
        <FormControl className="formControl">
          <InputLabel htmlFor="newTodo">Категории</InputLabel>
          <Select value={selectedCategory} onChange={selectChange}>
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.title}>
                {category.title}
              </MenuItem>
            ))}
            <MenuItem value={NEWCATEGORY}>{NEWCATEGORY}</MenuItem>
          </Select>
        </FormControl>
        <Button
          disabled={disabledButton()}
          onClick={handleSubmit}
          className="button"
          variant="contained"
          color="primary"
        >
          Создать
        </Button>
      </Card>
    </Form>
  );
};
