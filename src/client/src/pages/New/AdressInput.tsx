import React from 'react';
import styled from 'styled-components';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import useScript from 'src/hooks/useScript';
import { FormikInput } from 'src/components/formikElements';
import Loading from 'src/components/loading';
import Text from 'src/components/text';
import { Input } from 'src/components/formElements';
import Dropdown from 'src/components/layout/Dropdown';
import { FlexRow, Space } from 'src/components/layout';
import { calcDistance } from 'src/util/distance';
import devLog from 'src/util/devLog';
import theme from 'src/app/theme';
import Icon from 'src/components/icon';

export const Container = styled.div`
  width: 100%;
`;

export const SuggestionContainer = styled.div`
  padding: .5rem 1rem;
  cursor: pointer;
  font-family: inherit;
  max-width: 100%;

  // active
  background: ${(props) => (props.active ? 'rgba(0, 0, 0, .1)' : '')};
`;

const AddressInput = ({ data, setData }) => {
  const [loaded, error] = useScript(`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_MAP_KEY}&libraries=places`);

  const handleChange = (address) => {
    // reset data on adress change
    setData({
      address,
      milesToCampus: null,
      lat: null,
      lng: null,
    })
  }

  const handleSelect = (address) => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        const minDistance = Math.min(
          calcDistance(42.443147, -76.485249, latLng.lat, latLng.lng),
          calcDistance(42.447549, -76.487739, latLng.lat, latLng.lng),
          calcDistance(42.451288, -76.482072, latLng.lat, latLng.lng),
        );
        setData({
          address,
          milesToCampus: (Math.round(minDistance * 10) / 10),
          lat: latLng.lat,
          lng: latLng.lng,
        })
      })
      .catch((e) => devLog('AddressInput', e));
  }

  if (!loaded || error) return (
    <Input
      label='address'
      value={data.address}
      onChange={(e) => setData({ address: e.currentTarget.value })}
    />
  );

  return (
    <PlacesAutocomplete
      value={data.address}
      onChange={handleChange}
      onSelect={handleSelect}
    >
      {({
        getInputProps, suggestions, getSuggestionItemProps, loading,
      }) => (
        <Container>
          <Input
            label='address'
            value={data.address}
            {...getInputProps({})}
          />
          <Space margin='.3rem 0' />
          <Dropdown>
            {loading
              ? <Loading />
              : (
                suggestions.map((suggestion) => (
                  <SuggestionContainer
                    {...getSuggestionItemProps(suggestion)}
                    active={suggestion.active}
                    key={suggestion.description}
                  >
                    <Text variant='p' ellipsis>{suggestion.description}</Text>
                  </SuggestionContainer>
                ))
            )}
          </Dropdown>
          <Space margin='.5rem 0' />
          {data.milesToCampus && (
            <FlexRow ac>
              <Icon variant='place' size='1.5rem' fill={theme.textMuted} />
              <Space margin='0 .2rem' />
              <Text
                variant='h5'
                color={theme.textMuted}
              >
                {data.milesToCampus} miles to campus
              </Text>
            </FlexRow>
          )}
        </Container>
      )}
    </PlacesAutocomplete>
  );
};

export default AddressInput;