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
        <div className='pb-5'>
            <div className='card_i shadow-sm'>
                <div>
                    <h1 className='text-dark-to-light text-4xl font-bold text-center mb-4 form-header'>
                        Create
                        <span className='services-text'> Crowdsale</span>
                    </h1>
                </div>
                <form className='row g-3  needs-validation' noValidate>
                    <div className='col-md-4'>
                        <div className='row'>
                            <div className='col-md-12 pb-3'>
                                <label
                                    htmlFor='validationServer01'
                                    className='form-label text-dark-to-light'
                                >
                                    Name of Collection
                                </label>
                                <input
                                    type='text'
                                    placeholder="Collection's name"
                                    className='text-dark-to-light token-information input-bar form-control'
                                    id='validationServer01'
                                    name='name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                                <div className='invalid-feedback'></div>
                            </div>
                            <div className='col-md-12 pb-3'>
                                <label
                                    htmlFor='validationServer02'
                                    className='form-label text-dark-to-light'
                                >
                                    Description for Collection
                                </label>
                                <textarea
                                    type='text'
                                    style={{ height: '19vh' }}
                                    placeholder="Collection's Description"
                                    className='text-dark-to-light token-information input-bar form-control'
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
                            <div className='col-md-12 pb-3'>
                                <label
                                    htmlFor='validationServerUsername'
                                    className='form-label text-dark-to-light'
                                >
                                    Max Supply
                                </label>
                                <div className='input-group has-validation'>
                                    <input
                                        type='number'
                                        className='text-dark-to-light token-information input-bar form-control'
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
                    <div className='col-md-8'>
                        <div className='row'>
                            {' '}
                            <div className='col-md-6 pb-3'>
                                <label
                                    htmlFor='validationServerUsername'
                                    className='form-label text-dark-to-light'
                                >
                                    Presale Start Time
                                </label>
                                <input
                                    type='date'
                                    className='form-calender-cursor text-dark-to-light token-information input-bar form-control '
                                    name='maxSupply'
                                    value={presaleStartTime}
                                    onChange={(e) =>
                                        setPresaleStartTime(e.target.value)
                                    }
                                    placeholder='Presale start time.'
                                    id='validationServerUsername'
                                    aria-describedby='inputGroupPrepend3 validationServerUsernameFeedback'
                                    required
                                />
                                <div className='invalid-feedback'></div>
                            </div>
                            <div className='col-md-6 pb-3'>
                                <label
                                    htmlFor='validationServerUsername'
                                    className='form-label text-dark-to-light'
                                >
                                    Presale Mint Limit
                                </label>
                                <div className='input-group has-validation'>
                                    <input
                                        type='text'
                                        className='text-dark-to-light token-information input-bar form-control'
                                        name='maxSupply'
                                        value={presaleMintLimit}
                                        onChange={(e) =>
                                            setPresaleMintLimit(e.target.value)
                                        }
                                        placeholder='Max. NFTs for a wallet in presale.'
                                        id='validationServerUsername'
                                        aria-describedby='inputGroupPrepend3 validationServerUsernameFeedback'
                                        required
                                    />
                                    <div className='invalid-feedback'></div>
                                </div>
                            </div>
                            <div className='col-md-6 pb-3'>
                                <label
                                    htmlFor='validationServerUsername'
                                    className='form-label text-dark-to-light'
                                >
                                    Presale End Time
                                </label>
                                <div className='input-group has-validation'>
                                    <input
                                        type='date'
                                        className='form-calender-cursor text-dark-to-light token-information input-bar form-control'
                                        name='maxSupply'
                                        value={presaleEndTime}
                                        onChange={(e) =>
                                            setPresaleEndTime(e.target.value)
                                        }
                                        placeholder='Presale end time.'
                                        id='validationServerUsername'
                                        aria-describedby='inputGroupPrepend3 validationServerUsernameFeedback'
                                        required
                                    />
                                    <div className='invalid-feedback'></div>
                                </div>
                            </div>
                            <div className='col-md-6 pb-3'>
                                <label
                                    htmlFor='validationServerUsername'
                                    className='form-label text-dark-to-light'
                                >
                                    Template IPFS path
                                </label>
                                <div className='input-group has-validation'>
                                    <input
                                        type='text'
                                        className='text-dark-to-light token-information input-bar form-control'
                                        name='maxSupply'
                                        value={templatePath}
                                        onChange={(e) =>
                                            setTemplatePath(e.target.value)
                                        }
                                        placeholder='Base IPFS path.'
                                        id='validationServerUsername'
                                        aria-describedby='inputGroupPrepend3 validationServerUsernameFeedback'
                                        required
                                    />
                                    <div className='invalid-feedback'></div>
                                </div>
                            </div>
                            <div className='col-md-6 pb-3'>
                                <label
                                    htmlFor='validationServerUsername'
                                    className='form-label text-dark-to-light'
                                >
                                    Presale Price (XTZ)
                                </label>
                                <div className='input-group has-validation'>
                                    <input
                                        type='text'
                                        className='text-dark-to-light token-information input-bar form-control'
                                        name='maxSupply'
                                        value={presalePrice}
                                        onChange={(e) =>
                                            setPresalePrice(e.target.value)
                                        }
                                        placeholder='Enter price in XTZ'
                                        id='validationServerUsername'
                                        aria-describedby='inputGroupPrepend3 validationServerUsernameFeedback'
                                        required
                                    />
                                    <div className='invalid-feedback'></div>
                                </div>
                            </div>
                            <div className='col-md-6 pb-3'>
                                <label
                                    htmlFor='validationServerUsername'
                                    className='form-label text-dark-to-light'
                                >
                                    Public Sale Start Time
                                </label>
                                <div className='input-group has-validation'>
                                    <input
                                        type='date'
                                        className='form-calender-cursor text-dark-to-light token-information input-bar form-control'
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
                            <div className='col-md-6 pb-3'>
                                <label
                                    htmlFor='validationServerUsername'
                                    className='form-label text-dark-to-light'
                                >
                                    Public Sale Price (XTZ)
                                </label>
                                <div className='input-group has-validation'>
                                    <input
                                        type='text'
                                        className='text-dark-to-light token-information input-bar form-control'
                                        name='maxSupply'
                                        value={publicsalePrice}
                                        onChange={(e) =>
                                            setPublicsalePrice(e.target.value)
                                        }
                                        placeholder='Enter price in XTZ'
                                        id='validationServerUsername'
                                        aria-describedby='inputGroupPrepend3 validationServerUsernameFeedback'
                                        required
                                    />
                                    <div className='invalid-feedback'></div>
                                </div>
                            </div>
                            <div className='col-md-6 pb-3'>
                                <label
                                    htmlFor='validationServerUsername'
                                    className='form-label text-dark-to-light'
                                >
                                    Public Sale Mint Limit
                                </label>
                                <div className='input-group has-validation'>
                                    <input
                                        type='number'
                                        className='text-dark-to-light token-information input-bar form-control'
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
                            className={`text-center border-10  btn-faucet w-15 py-2 margin-auto my-2 ${
                                name ||
                                description ||
                                presalePrice ||
                                publicsalePrice ||
                                templatePath
                                    ? 'button-primary '
                                    : 'disable-b'
                            }`}
                        >
                            Create
                        </button>
                    </div>
                </form>
                {/* <form className='row g-3  needs-validation' noValidate> */}
                {/* <div className='col-md-4'>
                        <label
                            htmlFor='validationServer01'
                            className='form-label text-dark-to-light'
                        >
                            Name of Collection
                        </label>
                        <input
                            type='text'
                            placeholder="Collection's name"
                            className='text-dark-to-light token-information input-bar form-control'
                            id='validationServer01'
                            name='name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />

                        <div className='invalid-feedback'></div>
                    </div> */}
                {/* <div className='col-md-4'>
                        <label
                            htmlFor='validationServerUsername'
                            className='form-label text-dark-to-light'
                        >
                            Presale Start Time
                        </label>
                        <input
                            type='date'
                            className='form-calender-cursor text-dark-to-light token-information input-bar form-control '
                            name='maxSupply'
                            value={presaleStartTime}
                            onChange={(e) =>
                                setPresaleStartTime(e.target.value)
                            }
                            placeholder='Presale start time.'
                            id='validationServerUsername'
                            aria-describedby='inputGroupPrepend3 validationServerUsernameFeedback'
                            required
                        />
                        <div className='invalid-feedback'></div>
                    </div> */}
                {/* <div className='col-md-4'>
                        <label
                            htmlFor='validationServerUsername'
                            className='form-label text-dark-to-light'
                        >
                            Max Supply
                        </label>
                        <div className='input-group has-validation'>
                            <input
                                type='number'
                                className='text-dark-to-light token-information input-bar form-control'
                                name='maxSupply'
                                value={maxSupply}
                                onChange={(e) => setMaxSupply(e.target.value)}
                                placeholder="Collection's max supply"
                                id='validationServerUsername'
                                aria-describedby='inputGroupPrepend3 validationServerUsernameFeedback'
                                required
                            />
                            <div className='invalid-feedback'></div>
                        </div>
                    </div> */}
                {/* <div className='col-md-4'>
                        <label
                            htmlFor='validationServer02'
                            className='form-label text-dark-to-light'
                        >
                            Description for Collection
                        </label>
                        <textarea
                            type='text'
                            placeholder="Collection's Description"
                            className='text-dark-to-light token-information input-bar form-control'
                            id='validationServer02'
                            name='description'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                        <div className='invalid-feedback'></div>
                    </div> */}
                {/* <div className='col-md-4'>
                        <label
                            htmlFor='validationServerUsername'
                            className='form-label text-dark-to-light'
                        >
                            Presale End Time
                        </label>
                        <div className='input-group has-validation'>
                            <input
                                type='date'
                                className='form-calender-cursor text-dark-to-light token-information input-bar form-control'
                                name='maxSupply'
                                value={presaleEndTime}
                                onChange={(e) =>
                                    setPresaleEndTime(e.target.value)
                                }
                                placeholder='Presale end time.'
                                id='validationServerUsername'
                                aria-describedby='inputGroupPrepend3 validationServerUsernameFeedback'
                                required
                            />
                            <div className='invalid-feedback'></div>
                        </div>
                    </div> */}
                {/* <div className='col-md-4'>
                        <label
                            htmlFor='validationServerUsername'
                            className='form-label text-dark-to-light'
                        >
                            Presale Price (XTZ)
                        </label>
                        <div className='input-group has-validation'>
                            <input
                                type='text'
                                className='text-dark-to-light token-information input-bar form-control'
                                name='maxSupply'
                                value={presalePrice}
                                onChange={(e) =>
                                    setPresalePrice(e.target.value)
                                }
                                placeholder='Enter price in XTZ'
                                id='validationServerUsername'
                                aria-describedby='inputGroupPrepend3 validationServerUsernameFeedback'
                                required
                            />
                            <div className='invalid-feedback'></div>
                        </div>
                    </div> */}

                {/* <div className='col-md-4'></div> */}
                {/* <div className='col-md-4'>
                        <label
                            htmlFor='validationServerUsername'
                            className='form-label text-dark-to-light'
                        >
                            Presale Mint Limit
                        </label>
                        <div className='input-group has-validation'>
                            <input
                                type='text'
                                className='text-dark-to-light token-information input-bar form-control'
                                name='maxSupply'
                                value={presaleMintLimit}
                                onChange={(e) =>
                                    setPresaleMintLimit(e.target.value)
                                }
                                placeholder='Max. NFTs for a wallet in presale.'
                                id='validationServerUsername'
                                aria-describedby='inputGroupPrepend3 validationServerUsernameFeedback'
                                required
                            />
                            <div className='invalid-feedback'></div>
                        </div>
                    </div> */}
                {/* <div className='col-md-4'>
                        <label
                            htmlFor='validationServerUsername'
                            className='form-label text-dark-to-light'
                        >
                            Template IPFS path
                        </label>
                        <div className='input-group has-validation'>
                            <input
                                type='text'
                                className='text-dark-to-light token-information input-bar form-control'
                                name='maxSupply'
                                value={templatePath}
                                onChange={(e) =>
                                    setTemplatePath(e.target.value)
                                }
                                placeholder='Base IPFS path.'
                                id='validationServerUsername'
                                aria-describedby='inputGroupPrepend3 validationServerUsernameFeedback'
                                required
                            />
                            <div className='invalid-feedback'></div>
                        </div>
                    </div> */}
                {/* <div className='col-md-4'>
                        <label
                            htmlFor='validationServerUsername'
                            className='form-label text-dark-to-light'
                        >
                            Public Sale Price (XTZ)
                        </label>
                        <div className='input-group has-validation'>
                            <input
                                type='text'
                                className='text-dark-to-light token-information input-bar form-control'
                                name='maxSupply'
                                value={publicsalePrice}
                                onChange={(e) =>
                                    setPublicsalePrice(e.target.value)
                                }
                                placeholder='Enter price in XTZ'
                                id='validationServerUsername'
                                aria-describedby='inputGroupPrepend3 validationServerUsernameFeedback'
                                required
                            />
                            <div className='invalid-feedback'></div>
                        </div>
                    </div>
                    <div className='col-md-4'>
                        <label
                            htmlFor='validationServerUsername'
                            className='form-label text-dark-to-light'
                        >
                            Public Sale Start Time
                        </label>
                        <div className='input-group has-validation'>
                            <input
                                type='date'
                                className='form-calender-cursor text-dark-to-light token-information input-bar form-control'
                                name='maxSupply'
                                value={publicSaleStartTime}
                                onChange={(e) =>
                                    setPublicSaleStartTime(e.target.value)
                                }
                                placeholder='Public sale start time.'
                                id='validationServerUsername'
                                aria-describedby='inputGroupPrepend3 validationServerUsernameFeedback'
                                required
                            />
                            <div className='invalid-feedback'></div>
                        </div>
                    </div>
                    <div className='col-md-4'>
                        <label
                            htmlFor='validationServerUsername'
                            className='form-label text-dark-to-light'
                        >
                            Public Sale Mint Limit
                        </label>
                        <div className='input-group has-validation'>
                            <input
                                type='number'
                                className='text-dark-to-light token-information input-bar form-control'
                                name='maxSupply'
                                value={publicsaleMintLimit}
                                onChange={(e) =>
                                    setPublicsaleMintLimit(e.target.value)
                                }
                                placeholder='Max. NFTs for a wallet in public sale.'
                                id='validationServerUsername'
                                aria-describedby='inputGroupPrepend3 validationServerUsernameFeedback'
                                required
                            />
                            <div className='invalid-feedback'></div>
                        </div>
                    </div> */}

                {/* </form> */}
            </div>
        </div>
    );
};

export default CreateCrowdSale;
