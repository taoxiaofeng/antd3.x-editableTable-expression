import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { Table, Input, Button, Popconfirm, Form } from 'antd';

const EditableTable = () => {
  const [dataSource, setDataSource] = useState([
    {
      key: '0',
      name: 'Edward King 0',
      age: '32',
      address: 'London, Park Lane no. 0',
    },
    {
      key: '1',
      name: 'Edward King 1',
      age: '32',
      address: 'London, Park Lane no. 1',
    },
  ]);

  console.log(`dataSource -- `, dataSource);

  const handleDelete = (key) => {
    setDataSource((prevDataSource) =>
      prevDataSource.filter((item) => item.key !== key)
    );
  };

  const handleAdd = () => {
    const newData = {
      key: dataSource.length.toString(),
      name: `Edward King ${dataSource.length}`,
      age: 32,
      address: `London, Park Lane no. ${dataSource.length}`,
    };
    setDataSource((prevDataSource) => [...prevDataSource, newData]);
  };

  const handleSave = (key, dataIndex, value) => {
    setDataSource((prevDataSource) => {
      const newData = [...prevDataSource];
      const index = newData.findIndex((item) => key === item.key);
      const item = newData[index];
      newData.splice(index, 1, {
        ...item,
        [dataIndex]: value,
      });
      return newData;
    });
  };

  const columns = [
    {
      title: 'name',
      dataIndex: 'name',
      width: '30%',
      editable: true,
      render: (text, record) => (
        <EditableCell
          editable={record.editable}
          dataIndex="name"
          value={text}
          onSave={(value) => handleSave(record.key, 'name', value)}
        />
      ),
    },
    {
      title: 'age',
      dataIndex: 'age',
    },
    {
      title: 'address',
      dataIndex: 'address',
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (text, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.key)}
          >
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];

  return (
    <div>
      <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
        Add a row
      </Button>
      <Table dataSource={dataSource} columns={columns} bordered />
    </div>
  );
};

const EditableCell = ({ editable, dataIndex, value, onSave }) => {
  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const toggleEdit = () => {
    setEditing(!editing);
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleBlur = () => {
    setEditing(false);
    onSave(inputValue);
  };

  return (
    <div>
      {editing ? (
        <Input
          value={inputValue}
          onChange={handleChange}
          onPressEnter={handleBlur}
          onBlur={handleBlur}
          autoFocus
        />
      ) : (
        <div style={{ cursor: 'pointer' }} onClick={toggleEdit}>
          {value}
        </div>
      )}
    </div>
  );
};

ReactDOM.render(<EditableTable />, document.getElementById('container'));
