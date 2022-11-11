import React from 'react';

const CreateCrowdSale = () => {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [maxSupply, setMaxSupply] = React.useState(1);
    const [presalePrice, setPresalePrice] = React.useState(0);
    const [publicsalePrice, setPublicsalePrice] = React.useState(0);
    const [presaleMintLimit, setPresaleMintLimit] = React.useState(1);
    const [templatePath, setTemplatePath] = React.useState('');
    const [publicsaleMintLimit, setPublicsaleMintLimit] = React.useState(1);
    const [publicSaleStartTime, setPublicSaleStartTime] = React.useState(
        new Date()
    );
    const [presaleStartTime, setPresaleStartTime] = React.useState(new Date());
    const [presaleEndTime, setPresaleEndTime] = React.useState(new Date());
    // Example starter JavaScript for disabling form submissions if there are invalid fields
    (function () {
        'use strict';

        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.querySelectorAll('.needs-validation');

        // Loop over them and prevent submission
        Array.prototype.slice.call(forms).forEach(function (form) {
            form.addEventListener(
                'submit',
                function (event) {
                    if (!form.checkValidity()) {
                        event.preventDefault();
                        event.stopPropagation();
                    }

                    form.classList.add('was-validated');
                },
                false
            );
        });
    })();
    return (
        <div className='pb-3'>
            <div className='row row-cols-1 text-dark-to-light my-3 my-lg-0 my-md-0 mx-0 mx-lg-3 mx-md-3 text-sm-start'>
                <div className='d-flex bg-red flex-column flex-lg-row text-lg-start justify-content-between align-items-center p-0'>
                    <div className='col'>
                        <h4 className='fw-600 '>Create CrowdSale</h4>
                    </div>
                </div>
            </div>
            <div className='mt-4 mb-5 mb-lg-0 mb-md-0 row p-0 gx-5 project-layout mx-0 mx-lg-4 mx-md-3'>
                <div className='card_i shadow-sm'>
                    <form className='row g-3  needs-validation' noValidate>
                        <div className='col-md-4'>
                            <div className='row'>
                                <div className='col-md-12 pb-3'>
                                    <div className='form-group-2 text-start'>
                                        <label
                                            htmlFor='validationServer01'
                                            className='form-label text-start text-dark-to-light'
                                        >
                                            Name of Collection
                                        </label>
                                        <input
                                            type='text'
                                            placeholder="Collection's name"
                                            className='text-dark-to-light token-information text-14 input-bar form-control rounded'
                                            id='validationServer01'
                                            name='name'
                                            value={name}
                                            onChange={(e) =>
                                                setName(e.target.value)
                                            }
                                            required
                                        />
                                    </div>
                                    <div className='invalid-feedback'></div>
                                </div>
                                <div className='col-md-12 pb-3'>
                                    <div className='form-group-2 text-start'>
                                        <label
                                            htmlFor='validationServer02'
                                            className='form-label text-start text-dark-to-light'
                                        >
                                            Description for Collection
                                        </label>
                                        <textarea
                                            type='text'
                                            style={{ height: '17vh' }}
                                            placeholder="Collection's Description"
                                            className='text-dark-to-light token-information text-14 input-bar form-control rounded'
                                            id='validationServer02'
                                            name='description'
                                            value={description}
                                            onChange={(e) =>
                                                setDescription(e.target.value)
                                            }
                                            required
                                        />

                                        <div className='invalid-feedback'></div>
                                    </div>
                                </div>
                                <div className='col-md-12 pb-3'>
                                    <div className='form-group-2 text-start'>
                                        <label
                                            htmlFor='validationServerUsername'
                                            className='form-label text-dark-to-light'
                                            style={{ zIndex: '5' }}
                                        >
                                            Max Supply
                                        </label>
                                        <div className='input-group has-validation'>
                                            <input
                                                type='number'
                                                className='text-dark-to-light text-14 token-information input-bar form-control rounded'
                                                name='maxSupply'
                                                value={maxSupply}
                                                onChange={(e) =>
                                                    setMaxSupply(e.target.value)
                                                }
                                                placeholder="Collection's max supply"
                                                id='validationServerUsername'
                                                aria-describedby='inputGroupPrepend3 validationServerUsernameFeedback'
                                                required
                                            />
                                            <div className='invalid-feedback'></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-8'>
                            <div className='row'>
                                {' '}
                                <div className='col-md-6 pb-3'>
                                    <div className='form-group-2 text-start'>
                                        <label
                                            htmlFor='validationServerUsername'
                                            className='form-label text-dark-to-light'
                                        >
                                            Presale Start Time
                                        </label>
                                        <input
                                            type='datetime-local'
                                            className='form-calender-cursor text-14 text-dark-to-light token-information input-bar form-control rounded'
                                            name='maxSupply'
                                            value={presaleStartTime}
                                            onChange={(e) =>
                                                setPresaleStartTime(
                                                    e.target.value
                                                )
                                            }
                                            placeholder='Presale start time.'
                                            id='validationServerUsername'
                                            aria-describedby='inputGroupPrepend3 validationServerUsernameFeedback'
                                            required
                                        />
                                        <div className='invalid-feedback'></div>
                                    </div>
                                </div>
                                <div className='col-md-6 pb-3'>
                                    <div className='form-group-2 text-start'>
                                        <label
                                            htmlFor='validationServerUsername'
                                            className='form-label text-dark-to-light'
                                            style={{ zIndex: '5' }}
                                        >
                                            Presale Mint Limit
                                        </label>
                                        <div className='input-group has-validation'>
                                            <input
                                                type='text'
                                                className='text-dark-to-light text-14 token-information input-bar form-control rounded'
                                                name='maxSupply'
                                                value={presaleMintLimit}
                                                onChange={(e) =>
                                                    setPresaleMintLimit(
                                                        e.target.value
                                                    )
                                                }
                                                placeholder='Max. NFTs for a wallet in presale.'
                                                id='validationServerUsername'
                                                aria-describedby='inputGroupPrepend3 validationServerUsernameFeedback'
                                                required
                                            />
                                            <div className='invalid-feedback'></div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-6 pb-3'>
                                    <div className='form-group-2 text-start'>
                                        <label
                                            htmlFor='validationServerUsername'
                                            className='form-label text-dark-to-light'
                                            style={{ zIndex: '5' }}
                                        >
                                            Presale End Time
                                        </label>
                                        <div className='input-group has-validation'>
                                            <input
                                                type='datetime-local'
                                                className='form-calender-cursor text-14 text-dark-to-light token-information input-bar form-control rounded'
                                                name='maxSupply'
                                                value={presaleEndTime}
                                                onChange={(e) =>
                                                    setPresaleEndTime(
                                                        e.target.value
                                                    )
                                                }
                                                placeholder='Presale end time.'
                                                id='validationServerUsername'
                                                aria-describedby='inputGroupPrepend3 validationServerUsernameFeedback'
                                                required
                                            />
                                            <div className='invalid-feedback'></div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-6 pb-3'>
                                    <div className='form-group-2 text-start'>
                                        <label
                                            htmlFor='validationServerUsername'
                                            className='form-label text-dark-to-light'
                                            style={{ zIndex: '5' }}
                                        >
                                            Template IPFS path
                                        </label>
                                        <div className='input-group has-validation'>
                                            <input
                                                type='text'
                                                className='text-dark-to-light text-14 token-information input-bar form-control rounded'
                                                name='maxSupply'
                                                value={templatePath}
                                                onChange={(e) =>
                                                    setTemplatePath(
                                                        e.target.value
                                                    )
                                                }
                                                placeholder='Base IPFS path.'
                                                id='validationServerUsername'
                                                aria-describedby='inputGroupPrepend3 validationServerUsernameFeedback'
                                                required
                                            />
                                            <div className='invalid-feedback'></div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-6 pb-3'>
                                    <div className='form-group-2 text-start'>
                                        <label
                                            htmlFor='validationServerUsername'
                                            className='form-label text-dark-to-light'
                                            style={{ zIndex: '5' }}
                                        >
                                            Presale Price (XTZ)
                                        </label>
                                        <div className='input-group has-validation'>
                                            <input
                                                type='text'
                                                className='text-dark-to-light text-14 token-information input-bar form-control rounded'
                                                name='maxSupply'
                                                value={presalePrice}
                                                onChange={(e) =>
                                                    setPresalePrice(
                                                        e.target.value
                                                    )
                                                }
                                                placeholder='Enter price in XTZ'
                                                id='validationServerUsername'
                                                aria-describedby='inputGroupPrepend3 validationServerUsernameFeedback'
                                                required
                                            />
                                            <div className='invalid-feedback'></div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-6 pb-3'>
                                    <div className='form-group-2 text-start'>
                                        <label
                                            htmlFor='validationServerUsername'
                                            className='form-label text-dark-to-light'
                                            style={{ zIndex: '5' }}
                                        >
                                            Public Sale Start Time
                                        </label>
                                        <div className='input-group has-validation'>
                                            <input
                                                type='datetime-local'
                                                className='form-calender-cursor text-14 text-dark-to-light token-information input-bar form-control rounded'
                                                name='maxSupply'
                                                value={publicSaleStartTime}
                                                onChange={(e) =>
                                                    setPublicSaleStartTime(
                                                        e.target.value
                                                    )
                                                }
                                                placeholder='Public sale start time.'
                                                id='validationServerUsername'
                                                aria-describedby='inputGroupPrepend3 validationServerUsernameFeedback'
                                                required
                                            />
                                            <div className='invalid-feedback'></div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-6 pb-3'>
                                    <div className='form-group-2 text-start'>
                                        <label
                                            htmlFor='validationServerUsername'
                                            className='form-label text-dark-to-light'
                                            style={{ zIndex: '5' }}
                                        >
                                            Public Sale Price (XTZ)
                                        </label>
                                        <div className='input-group has-validation'>
                                            <input
                                                type='text'
                                                className='text-dark-to-light text-14 token-information input-bar form-control rounded'
                                                name='maxSupply'
                                                value={publicsalePrice}
                                                onChange={(e) =>
                                                    setPublicsalePrice(
                                                        e.target.value
                                                    )
                                                }
                                                placeholder='Enter price in XTZ'
                                                id='validationServerUsername'
                                                aria-describedby='inputGroupPrepend3 validationServerUsernameFeedback'
                                                required
                                            />
                                            <div className='invalid-feedback'></div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-6 pb-3'>
                                    <div className='form-group-2 text-start'>
                                        <label
                                            htmlFor='validationServerUsername'
                                            className='form-label text-dark-to-light'
                                            style={{ zIndex: '5' }}
                                        >
                                            Public Sale Mint Limit
                                        </label>
                                        <div className='input-group has-validation'>
                                            <input
                                                type='number'
                                                className='text-dark-to-light text-14 token-information input-bar form-control rounded'
                                                name='maxSupply'
                                                value={publicsaleMintLimit}
                                                onChange={(e) =>
                                                    setPublicsaleMintLimit(
                                                        e.target.value
                                                    )
                                                }
                                                placeholder='Max. NFTs for a wallet in public sale.'
                                                id='validationServerUsername'
                                                aria-describedby='inputGroupPrepend3 validationServerUsernameFeedback'
                                                required
                                            />
                                            <div className='invalid-feedback'></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-12'>
                            <div className='form-check'>
                                <input
                                    className='form-check-input is-invalid'
                                    type='checkbox'
                                    value=''
                                    id='invalidCheck3'
                                    aria-describedby='invalidCheck3Feedback'
                                    required
                                />
                                <label
                                    className='form-check-label text-dark-to-light'
                                    htmlFor='invalidCheck3'
                                >
                                    Agree to terms and conditions
                                </label>
                                <div
                                    id='invalidCheck3Feedback'
                                    className='invalid-feedback text-dark-to-light'
                                >
                                    You must agree before submitting.
                                </div>
                            </div>
                        </div>
                        <div className='col-12 py-2'>
                            <button
                                disabled={!name}
                                type='submit'
                                className={`text-center rounded  btn-faucet width-media py-2 margin-auto my-2 ${
                                    name ? 'button-primary ' : 'disable-b'
                                }`}
                            >
                                Create
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateCrowdSale;
