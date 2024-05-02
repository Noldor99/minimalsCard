import * as React from 'react';
import PropTypes from 'prop-types';
import { useEffect, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { formHelperTextClasses } from '@mui/material/FormHelperText';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import Iconify from 'src/components/iconify';
import { ColorPicker } from 'src/components/color-utils';
import FormProvider, { RHFSelect } from 'src/components/hook-form';

import IncrementerButton from './common/incrementer-button';

// ----------------------------------------------------------------------

export default function ProductDetailsSummary({
  items,
  product,
  onAddCart,
  onGotoStep,
  disabledActions,
  ...other
}) {
  const router = useRouter();

  const { id, name, sizes, price, coverUrl, colors, available, totalRatings, totalReviews } =
    product;

  const [alignment, setAlignment] = React.useState('Mouse');

  const handleChange = (e, newAlignment) => {
    setAlignment(newAlignment);
  };

  const existProduct = !!items?.length && items.map((item) => item.id).includes(id);

  const isMaxQuantity =
    !!items?.length &&
    items.filter((item) => item.id === id).map((item) => item.quantity)[0] >= available;

  const defaultValues = {
    id,
    name,
    coverUrl,
    available,
    price,
    colors: colors[0],
    size: sizes[4],
    quantity: available < 1 ? 0 : 1,
  };

  const methods = useForm({
    defaultValues,
  });

  const { reset, watch, control, setValue, handleSubmit } = methods;

  const values = watch();

  useEffect(() => {
    if (product) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (!existProduct) {
        onAddCart?.({
          ...data,
          colors: [values.colors],
          subTotal: data.price * data.quantity,
        });
      }
      onGotoStep?.(0);
      router.push(paths.product.checkout);
    } catch (error) {
      console.error(error);
    }
  });

  const handleAddCart = useCallback(() => {
    try {
      onAddCart?.({
        ...values,
        colors: [values.colors],
        subTotal: values.price * values.quantity,
      });
    } catch (error) {
      console.error(error);
    }
  }, [onAddCart, values]);

  const renderPrice = (
    <Box sx={{ typography: 'h5', color: 'red' }}>
      <Box
        component="span"
        sx={{
          color: 'text.disabled',
          mr: 0.5,
        }}
      >
        price:
      </Box>
      {price} $
    </Box>
  );

  const renderColorOptions = (
    <Stack direction="row">
      <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
        Color:
      </Typography>

      <Controller
        name="colors"
        control={control}
        render={({ field }) => (
          <ColorPicker
            colors={colors}
            selected={field.value}
            onSelectColor={(color) => field.onChange(color)}
            limit={4}
          />
        )}
      />
    </Stack>
  );

  const renderSizeOptions = (
    <Stack direction="row">
      <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
        Size:
      </Typography>

      <RHFSelect
        name="size"
        size="small"
        helperText={
          <Link underline="always" color="textPrimary">
            Size Chart
          </Link>
        }
        sx={{
          maxWidth: 88,
          [`& .${formHelperTextClasses.root}`]: {
            mx: 0,
            mt: 1,
            textAlign: 'right',
          },
        }}
      >
        {sizes.map((size) => (
          <MenuItem key={size} value={size}>
            {size}
          </MenuItem>
        ))}
      </RHFSelect>
    </Stack>
  );

  const renderPattern = (
    <>
      <Box display="flex" gap={3}>
        <Typography sx={{ marginTop: 1 }}> Pattern Name: </Typography>
        <Typography variant="h4" sx={{ fontSize: 'bold', color: 'red' }}>
          {' '}
          {alignment}
        </Typography>
      </Box>
      <ToggleButtonGroup
        color="primary"
        value={alignment}
        display="flex"
        exclusive
        sx={{ flexWrap: 'wrap' }}
        onChange={handleChange}
        aria-label="Platform"
      >
        <ToggleButton value="Mouse">Mouse</ToggleButton>
        <ToggleButton value="Mouse + Gaming Mic">Mouse + Gaming Mic</ToggleButton>
        <ToggleButton value="Mouse + Headset">Mouse + Headset</ToggleButton>
        <ToggleButton value="Mouse + Keyboard">Mouse + Keyboard</ToggleButton>
        <ToggleButton value="Mouse + Mousepad">Mouse + Mousepad</ToggleButton>
      </ToggleButtonGroup>
    </>
  );
  const renderQuantity = (
    <Stack direction="row">
      <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
        Quantity
      </Typography>

      <Stack spacing={1}>
        <IncrementerButton
          name="quantity"
          quantity={values.quantity}
          disabledDecrease={values.quantity <= 1}
          disabledIncrease={values.quantity >= available}
          onIncrease={() => setValue('quantity', values.quantity + 1)}
          onDecrease={() => setValue('quantity', values.quantity - 1)}
        />

        <Typography variant="caption" component="div" sx={{ textAlign: 'right' }}>
          Available: {available}
        </Typography>
      </Stack>
    </Stack>
  );

  const renderActions = (
    <Stack direction="row" spacing={2}>
      <Button
        fullWidth
        disabled={isMaxQuantity || disabledActions}
        size="large"
        color="warning"
        variant="contained"
        startIcon={<Iconify icon="solar:cart-plus-bold" width={24} />}
        onClick={handleAddCart}
        sx={{ whiteSpace: 'nowrap' }}
      >
        Add to Cart
      </Button>

      <Button fullWidth size="large" type="submit" variant="contained" disabled={disabledActions}>
        Buy Now
      </Button>
    </Stack>
  );

  const renderSubDescription = (
    <Box>
      {[
        { text: 'Brand', label: 'Logitech G' },
        { text: 'Color', label: 'Black' },
        { text: 'Technology', label: 'LIGHTSPEED Wireless' },
        { text: 'Movement Detection', label: 'Optical' },
      ].map((item) => (
        <Box key={item.label} display="flex" gap={4}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {item.text}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 'bold' }}>
            {item.label}
          </Typography>
        </Box>
      ))}
    </Box>
  );

  const renderRating = (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        color: 'text.disabled',
        typography: 'body2',
      }}
    >
      <Rating size="small" value={totalRatings} precision={0.1} readOnly sx={{ mr: 1 }} />
      {`(${totalReviews} reviews)`}
    </Stack>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack spacing={3} sx={{ pt: 3 }} {...other}>
        <Stack spacing={2} alignItems="flex-start">
          <Typography variant="h5">{name}</Typography>
          <Link
            className="text-blue-500 hover:underline"
            href="https://www.amazon.com/stores/LogitechG/page/0F4BFDF6-CD4A-4A8C-83A2-3104165D740C?ref_=ast_bln"
          >
            Visit the Logitech G Store
          </Link>
          {renderRating}

          {renderPrice}

          {renderSubDescription}
        </Stack>

        <Typography color="red">Only 1 left in stock - order soon.</Typography>

        <Divider sx={{ borderStyle: 'dashed' }} />

        {renderColorOptions}

        {renderSizeOptions}

        {renderPattern}

        {renderQuantity}

        <Divider sx={{ borderStyle: 'dashed' }} />

        {renderActions}
      </Stack>
    </FormProvider>
  );
}

ProductDetailsSummary.propTypes = {
  items: PropTypes.array,
  disabledActions: PropTypes.bool,
  onAddCart: PropTypes.func,
  onGotoStep: PropTypes.func,
  product: PropTypes.object,
};
