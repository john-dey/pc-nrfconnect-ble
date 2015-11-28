/* Copyright (c) 2015 Nordic Semiconductor. All Rights Reserved.
 *
 * The information contained herein is property of Nordic Semiconductor ASA.
 * Terms and conditions of usage are described in detail in NORDIC
 * SEMICONDUCTOR STANDARD SOFTWARE LICENSE AGREEMENT.
 *
 * Licensees are granted free, non-transferable use of the information. NO
 * WARRANTY of ANY KIND is provided. This heading must NOT be removed from
 * the file.
 *
 */
'use strict';

import React, { PropTypes } from 'react';
import Component from 'react-pure-render/component';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

import AdvertisingList from './AdvertisingList';
import AdvertisingData from './AdvertisingData';

import * as AdvertisingSetupActions from '../actions/advertisingSetupActions';

class AdvertisingSetup extends Component {
    constructor(props) {
        super(props);
        this.id = 0;
    }

    handleDeleteFromAdvData(id) {
        console.log('DELETE id: ' + id);
    }

    handleDeleteFromScanRsp(id) {
        console.log('DELETE id: ' + id);
    }

    addToAdvData() {
        this.id++;
        this.typeValue.id = this.id;
        const newValue = Object.assign({}, this.typeValue);
        this.props.addAdvEntry(newValue);
        console.log('ADV DATA UPDATED');
    }

    addToScanResponse() {
        this.id++;
        this.typeValue.id = this.id;
        const newValue = Object.assign({}, this.typeValue);
        this.props.addScanRsp(newValue);
        console.log('ADD TO SCAN RESPONSE');
    }

    handleValueChange(typeValue) {
        console.log('VALUE CHANGE');
        this.typeValue = typeValue;
    }

    handleApply() {
        const {
            setAdvertisingData,
            advertisingSetup,
            hideDialog,
        } = this.props;

        setAdvertisingData(advertisingSetup);
    }

    render() {
        const {
            advDataEntries,
            scanResponseEntries,
            show,
            addAdvEntry,
            deleteAdvData,
            addScanRsp,
            deleteScanRsp,
            showDialog,
            hideDialog,
        } = this.props;

        return (
            <div>
                <Modal show={show} onHide={() => {}} bsSize='large'>
                    <Modal.Header>
                        <Modal.Title>Advertising setup</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='adv-setup'>
                        <AdvertisingData onValueChange={value => this.handleValueChange(value)}/>
                        <div className='adv-row'>
                            <div className='adv-col adv-pkt'>
                                <Button
                                    className='btn-add'
                                    onClick={id => this.addToAdvData()}>Add to adv. data</Button>
                                <AdvertisingList
                                    title='Advertising data'
                                    onDelete={deleteAdvData}
                                    advEntries={advDataEntries}/>
                            </div>
                            <div className='adv-col scan-rsp-pkt'>
                                <Button
                                    className='btn-add'
                                    onClick={() => this.addToScanResponse()}>Add to scan response</Button>
                                <AdvertisingList
                                    title='Scan response data'
                                    onDelete={deleteScanRsp}
                                    advEntries={scanResponseEntries}/>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => this.handleApply()}>Apply</Button>
                        <Button onClick={hideDialog}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {advertisingSetup} = state;

    return {
        advertisingSetup: advertisingSetup,
        advDataEntries: advertisingSetup.advDataEntries,
        scanResponseEntries: advertisingSetup.scanResponseEntries,
        show: advertisingSetup.show,
    };
}

function mapDispatchToProps(dispatch) {
    let retval = Object.assign(
        {},
        bindActionCreators(AdvertisingSetupActions, dispatch),
    );

    return retval;
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdvertisingSetup);

AdvertisingSetup.propTypes = {
    advDataEntries: PropTypes.object.isRequired,
    scanResponseEntries: PropTypes.object.isRequired,
    show: PropTypes.bool.isRequired,
    addAdvEntry: PropTypes.func.isRequired,
    setAdvertisingData: PropTypes.func.isRequired,
    advertisingSetup: PropTypes.object.isRequired,
    deleteAdvData: PropTypes.func.isRequired,
    addScanRsp: PropTypes.func.isRequired,
    deleteScanRsp: PropTypes.func.isRequired,
    showDialog: PropTypes.func.isRequired,
    hideDialog: PropTypes.func.isRequired,
};
