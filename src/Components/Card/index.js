import React, { useState } from "react";
import { useStyles } from "./useStyles";
import { Card, CardHeader, CardContent, Typography, Box, IconButton } from "@material-ui/core";
import { Check, Clear, MoreVert } from "@material-ui/icons";
import { useSelector } from "react-redux";

export default function CardComponent({ task, editClick }) {
  const classes = useStyles();

  // Максимальное кол-во символов в карточке 150. Если больше то скрывается в подсказку Read more.
  const [content, setContent] = useState(
    task.text.length > 150 ? task.text.substring(0, 150) : task.text
  );
  
  // Первоночальное состояние подсказки 
  const [readMore, setReadMore] = useState(" ...Read more");
  // Проверка авторизации
  const { isLoggedIn } = useSelector((state) => state);


  const handle = () => {
    if (readMore === " ...Read more") {
      setContent(task.text);
      setReadMore(" Read less");
    } else {
      setContent(task.text.substring(0, 150));
      setReadMore(" ...Read more");
    }
  };

  return (
    <Box className={classes.taskTable}>
      <Card className={classes.root}>
        {/* Карточка */}
        <CardHeader
          avatar={task.status == 0 || task.status == 1 ? <Clear /> : <Check />}
          title={task.username}
          subheader={task.status == 1 || task.status == 11 ?  (<>{task.email} <b>Modified by admin</b></> ): task.email }
          action={
            isLoggedIn ? (
              <IconButton
                aria-label="settings"
                onClick={() => editClick(task.id)}
              >
                <MoreVert />
              </IconButton>
            ) : null
          }
        ></CardHeader>
        {/* Текст в карточке */}
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {content}
            {task.text.length > 150 && (
              <a onClick={handle}>
                <b>{readMore}</b>
              </a>
            )}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
