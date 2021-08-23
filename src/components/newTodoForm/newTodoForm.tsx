import styled from 'styled-components';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Category } from '../../App';
import { useState } from 'react';
import React from 'react';
import Button from '@material-ui/core/Button';

const Form = styled.form`
  width: 385px;
  display: flex;
  flex-direction: column;

  .formControl {
    margin-bottom: 20px;
  }

  .button {
    align-self: center;
  }
`;
interface IProps {
  categories: Array<Category>;
  createTodo: Function;
}

const NewTodoForm = ({ categories, createTodo }: IProps) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [newTodoText, setNewTodoText] = useState({
    categoryName: '',
    todoText: '',
  });

  const NEWCATEGORY = 'Новая категория';

  const selectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const value = event.target.value as string;
    setSelectedCategory(value);
  };

  const handelSubmit = () => {
    selectedCategory === NEWCATEGORY
      ? createTodo({
          title: newTodoText.categoryName,
          text: newTodoText.todoText,
        })
      : createTodo({ title: selectedCategory, text: newTodoText.todoText });
  };

  const inputChange = (fieldName: string) => (fieldValue: string) => {
    setNewTodoText({ ...newTodoText, [fieldName]: fieldValue });
  };

  return (
    <Form>
      {console.log(selectedCategory)}
      {selectedCategory === NEWCATEGORY && (
        <FormControl className="formControl">
          <InputLabel htmlFor="newCategory">Название категории</InputLabel>
          <Input
            value={newTodoText.categoryName}
            onChange={(e: any) => inputChange('categoryName')(e.target.value)}
            id="newCategory"
            aria-describedby="my-helper-text"
          />
        </FormControl>
      )}
      <FormControl className="formControl">
        <InputLabel htmlFor="newTodo">Название задачи</InputLabel>
        <Input
          value={newTodoText.todoText}
          onChange={(e: any) => inputChange('todoText')(e.target.value)}
          id="newTodo"
          aria-describedby="my-helper-text"
        />
      </FormControl>
      <FormControl className="formControl">
        <InputLabel htmlFor="newTodo">Категории</InputLabel>
        <Select
          value={selectedCategory}
          onChange={selectChange}
          id="selectCategory"
          aria-describedby="my-helper-text"
        >
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.title}>
              {category.title}
            </MenuItem>
          ))}
          <MenuItem value={NEWCATEGORY}>{NEWCATEGORY}</MenuItem>
        </Select>
      </FormControl>
      <Button
        onClick={handelSubmit}
        className="button"
        variant="contained"
        color="primary"
      >
        Создать
      </Button>
    </Form>
  );
};

export default NewTodoForm;
