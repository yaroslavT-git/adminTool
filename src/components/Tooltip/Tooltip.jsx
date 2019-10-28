import './Tooltip.scss';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Icon } from "semantic-ui-react";
import _ from 'lodash';
import { SketchPicker } from 'react-color';

const Tooltip = ({ data, saveCallback }) => {
    const [tooltipData, setTooltipData] = useState(data);
    const [isShowBgPicker, setIsShowBgPicker] = useState(false);
    const [isShowPicker, setIsShowPicker] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        setTooltipData(data);
    }, [data]);

    const handleChangeInput = (value) => {
        if (value.length <= 140) {
            setTooltipData({...tooltipData, text: value});
        }
    };

    const handleChangeColor = (color) => setTooltipData({ ...tooltipData, color: color.hex });

    const handleChangeBgColor = (color) => setTooltipData({ ...tooltipData, bgColor: color.hex });

    const handleOpenPicker = (colorState, bgState) => {
        setIsShowPicker(colorState);
        setIsShowBgPicker(bgState);
    };

    const handleClickClose = () => {
        setTooltipData(data);
        setIsEdit(false);
    };

    const handleSave = () => {
        saveCallback(tooltipData);
        setIsShowBgPicker(false);
        setIsShowPicker(false);
        setIsEdit(false)
    };

    const drag = e => {
        const shiftX = e.clientX - e.target.getBoundingClientRect().left;
        const shiftY = e.clientY - e.target.getBoundingClientRect().top;
        e.dataTransfer.setData('toolTipX', shiftX);
        e.dataTransfer.setData('toolTipY', shiftY);
    };

    return (
        <div style={{ top: tooltipData.position.top, left: tooltipData.position.left }} className='tooltip__wrap' draggable onDragStart={drag}>
            <div className='tooltip__input'>
                {isEdit ? (
                    <>
                        <input style={{ color: tooltipData.color, background: tooltipData.bgColor }} value={tooltipData.text} onChange={({ target }) => handleChangeInput(target.value)}/>
                        <div className='tooltip__picker-wrap'>
                            <div onClick={() => handleOpenPicker(!isShowPicker, false)} className='tooltip__picker-btn' style={{ background: tooltipData.color }}/>
                            {isShowPicker && (
                                <div className='tooltip__picker-color'>
                                    <SketchPicker color={tooltipData.color} onChange={handleChangeColor} />
                                </div>
                            )}
                        </div>
                        <div className='tooltip__picker-wrap'>
                            <Icon onClick={() => handleOpenPicker(false, !isShowBgPicker)} size='large' inverted name='tint' color='grey'/>
                            {isShowBgPicker && (
                                <div className='tooltip__picker-color'>
                                    <SketchPicker color={tooltipData.bgColor} onChange={handleChangeBgColor} />
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <div style={{ background: tooltipData.bgColor }} className='tooltip__content'>
                        {!_.isEmpty(tooltipData.text)
                            ? <span style={{ color: tooltipData.color }}>{tooltipData.text}</span>
                            : <span className='tooltip__content-add' onClick={() => setIsEdit(true)}>Add Tooltip</span>
                        }
                    </div>
                )}
            </div>
            <div className='tooltip__btns'>
                {!isEdit ? !_.isEmpty(tooltipData.text) && <Icon onClick={() => setIsEdit(true)} name='edit' color='green'/>
                : (<>
                    <Icon onClick={handleSave} name='save' color='green'/>
                    <Icon onClick={handleClickClose} name='close' inverted color='grey'/>
                </>)
                }
            </div>
        </div>
    )
};

Tooltip.propTypes = {
    saveCallback: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
};

export default Tooltip;
