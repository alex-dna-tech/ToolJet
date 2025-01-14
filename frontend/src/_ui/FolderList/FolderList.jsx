import React from 'react';
import './FolderList.scss';
import SolidIcon from '../Icon/solidIcons/index';
import Skeleton from 'react-loading-skeleton';

function FolderList({
  className,
  backgroundColor,
  disabled,
  RightIcon,
  LeftIcon,
  children,
  onClick,
  selectedItem,
  isLoading = false,
  ...restProps
}) {
  return (
    <>
      {!isLoading ? (
        <button
          {...restProps}
          className={`tj-list-item ${selectedItem && 'tj-list-item-selected'}  ${className} ${
            disabled && `tj-list-item-disabled`
          }`}
          style={backgroundColor && { backgroundColor }}
          onClick={onClick}
        >
          {LeftIcon && (
            <div className="tj-list-item-icon">
              <SolidIcon name={LeftIcon} />
            </div>
          )}

          {children}

          {RightIcon && <div className="tj-list-item-icon">{RightIcon && <SolidIcon name={RightIcon} />}</div>}
        </button>
      ) : (
        <Skeleton count={4} />
      )}
    </>
  );
}

export default FolderList;
