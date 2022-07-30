import { ReactNode, useCallback, useEffect, useState } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

import {
  List as MaterialList,
  ListItem,
  Button,
  Container,
} from "@mui/material";

import { ListProps } from "./List.props";

export const List = (props: ListProps): JSX.Element => {
  const { children, elements, max, sharedKey, ...restProps } = props;

  const [visibleElements, setVisibleElements] = useState<
    ReactNode[] | undefined
  >(max ? elements?.slice(0, max) : elements);

  useEffect(() => {
    setVisibleElements(max ? elements?.slice(0, max) : elements);
  }, [max, elements]);

  const expand = () => {
    setVisibleElements(elements);
  };
  const collaps = () => {
    setVisibleElements(elements?.slice(0, max));
  };

  const renderElements = useCallback(() => {
    if (!elements) return <></>;

    if (!max)
      return (
        <>
          {elements?.map((e, i) => (
            <ListItem key={`${sharedKey}-${i}`}>{e}</ListItem>
          ))}
        </>
      );

    const isDisplayButton = elements.length > max;

    const button =
      visibleElements && visibleElements < elements ? (
        <Button onClick={expand}>
          <Container>
            <FaArrowDown /> показать больше
          </Container>
        </Button>
      ) : (
        <Button onClick={collaps}>
          <Container>
            <FaArrowUp /> свернуть
          </Container>
        </Button>
      );

    return (
      <>
        {visibleElements?.map((e, i) => (
          <ListItem key={`${sharedKey}-${i}`}>{e}</ListItem>
        ))}
        {isDisplayButton && <>{button}</>}
      </>
    );
  }, [elements, max, visibleElements]);

  return (
    <MaterialList {...restProps}>
      {children}

      {renderElements()}
    </MaterialList>
  );
};
