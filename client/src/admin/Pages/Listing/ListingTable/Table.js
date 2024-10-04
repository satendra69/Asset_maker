import { useMemo, useState } from "react";
import dayjs from 'dayjs';
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import { useNavigate } from "react-router-dom";
import { Box, Button, Dialog, } from "@mui/material";
import { Edit, Delete, FileCopy as CopyIcon } from "@mui/icons-material";
import httpCommon from "../../../../http-common";

function Table({ data, handleClose, open, setOpen, mutation }) {
  const [selectedId, setSelectedId] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const navigate = useNavigate();

  const getMainImageUrl = (attachments) => {
    if (!attachments || !Array.isArray(attachments)) {
      return httpCommon.defaults.baseURL + '\\images\\defaultasset.jpg';
    }
    const mainImage = attachments.find(att => att.type === "Main");
    return mainImage
      ? httpCommon.defaults.baseURL + mainImage.attachment
      : httpCommon.defaults.baseURL + '\\images\\defaultasset.jpg';
  };

  const capitalizeFirstLetter = (string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const getDynamicFields = (type) => {
    switch (type) {
      case 'CommercialProperties':
        return {
          desc: 'ltg_det_comm_prop_desc',
          salePrice: 'ltg_det_comm_prop_sale_price',
          area: 'ltg_det_comm_prop_pmts_area_dts',
          address: 'ltg_det_comm_prop_address',

        };
      case 'PentHouses':
        return {
          desc: 'ltg_det_penthouses_desc',
          salePrice: 'ltg_det_penthouses_sale_price',
          area: 'ltg_det_penthouses_pmts_area_dts',
          address: 'ltg_det_penthouses_address',
        };
      case 'Plots':
        return {
          desc: 'ltg_det_plot_desc',
          salePrice: 'ltg_det_plot_sale_price',
          area: 'ltg_det_plot_pmts_area_dts',
          address: 'ltg_det_plot_address',
        };
      case 'RowHouses':
        return {
          desc: 'ltg_det_row_house_desc',
          salePrice: 'ltg_det_row_house_sale_price',
          area: 'ltg_det_row_house_pmts_area_dts',
          address: 'ltg_det_row_house_address',
        };
      case 'Villaments':
        return {
          desc: 'ltg_det_villaments_desc',
          salePrice: 'ltg_det_villaments_sale_price',
          area: 'ltg_det_villaments_pmts_area_dts',
          address: 'ltg_det_villaments_address',
        };
      default:
        return {
          desc: 'ltg_det_desc',
          salePrice: 'ltg_det_sale_price',
          area: 'ltg_det_pmts_area_dts',
          address: 'ltg_det_address',
        };
    }
  };

  const formatText = (text) => {
    if (text !== undefined) {
      if (text === "AssetMakers") {
        return "Asset Makers";
      }
      return text.replace(/\b\w/g, char => char.toUpperCase());
    } else {
      return "";
    }
  };

  const formatSalePrice = (price) => {
    if (!price) return '';
    const strPrice = price.toString();
    const lastThreeDigits = strPrice.slice(-3);
    let otherDigits = strPrice.slice(0, -3);
    if (otherDigits.length > 0) {
      otherDigits = otherDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
    }
    return otherDigits.length > 0 ? otherDigits + ',' + lastThreeDigits : lastThreeDigits;

  };

  const columns = useMemo(
    () => [
      {
        id: "actions",
        header: "",
        size: 10,
        Cell: ({ row }) => (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: 1,
              alignItems: 'center',
            }}
          >
            <Button
              variant="contained"
              color="primary"
              size="small"
              sx={{
                minWidth: 0,
                width: 20,
                height: 20,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onClick={() => navigate(`/admin/property/edit/${row.original.ltg_det_mstRowID}`)}
            >
              <Edit style={{ fontSize: 15 }} />
            </Button>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              sx={{
                minWidth: 0,
                width: 20,
                height: 20,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onClick={() => navigate(`/admin/property/clone/${row.original.ltg_det_mstRowID}`)}
            >
              <CopyIcon style={{ fontSize: 15 }} />
            </Button>
            <Button
              variant="contained"
              color="error"
              size="small"
              sx={{
                minWidth: 0,
                width: 20,
                height: 20,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onClick={() => {
                setSelectedId(row.original.ltg_det_mstRowID);
                setSelectedType(row.original.ltg_type);
                setOpen(true);
              }}
            >
              <Delete style={{ fontSize: 15 }} />
            </Button>
          </Box>
        ),
      },
      {
        id: "mainImage",
        header: "Property Image",
        size: 100,
        Cell: ({ row }) => {
          const imageUrl = getMainImageUrl(row.original.attachments);
          return (
            <img
              src={imageUrl}
              alt={row.original.ltg_title}
              style={{ width: "100%", height: "auto", maxHeight: "100px", objectFit: "cover" }}
            />
          );
        },
      },
      {
        id: "ltg_title",
        header: "Property Title",
        accessorKey: "ltg_title",
        size: 200,
        Cell: ({ cell }) => capitalizeFirstLetter(cell.getValue()),
      },
      {
        id: "ltg_owner",
        header: "Owner",
        accessorKey: "ltg_owner",
        size: 150,
        Cell: ({ cell }) => formatText(cell.getValue()),
      },
      {
        id: 'description',
        accessorFn: (row) => row[getDynamicFields(row.ltg_type).desc],
        enableClickToCopy: true,
        filterVariant: 'autocomplete',
        header: 'Description',
        size: 300,
        Cell: ({ row }) => {
          const descriptionHtml = row.original[getDynamicFields(row.original.ltg_type).desc];
          if (!descriptionHtml) {
            return '';
          }
          const descriptionText = descriptionHtml.replace(/<[^>]*>/g, '').trim();
          const capitalizedDescription = descriptionText.charAt(0).toUpperCase() + descriptionText.slice(1);
          const updatedHtml = descriptionHtml.replace(descriptionText, capitalizedDescription);

          return (
            <Box
              sx={{
                maxWidth: '300px',
                maxHeight: '100px',
                whiteSpace: 'normal',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              <div
                dangerouslySetInnerHTML={{ __html: updatedHtml }}
              />
            </Box>
          );
        },
      },
      {
        id: "salePrice",
        accessorFn: (row) => row[getDynamicFields(row.ltg_type).salePrice],
        filterFn: "between",
        header: "Price",
        size: 50,
        Cell: ({ cell }) => (
          <Box
            component="span"
            sx={(theme) => ({
              backgroundColor:
                cell.getValue() < 50_000
                  ? theme.palette.error.dark
                  : cell.getValue() >= 50_000 && cell.getValue() < 75_000
                    ? theme.palette.warning.dark
                    : theme.palette.success.dark,
              borderRadius: "0.25rem",
              color: "#fff",
              maxWidth: "9ch",
              p: "0.25rem",
            })}
          >
            {formatSalePrice(cell.getValue())}
          </Box>
        ),
      },
      {
        accessorKey: "ltg_categories",
        header: "Category",
        size: 60,
        Cell: ({ cell }) => capitalizeFirstLetter(cell.getValue()),
      },
      {
        accessorFn: (row) => row[getDynamicFields(row.ltg_type).address],
        header: "Address",
        size: 80,
        Cell: ({ cell }) => capitalizeFirstLetter(cell.getValue()),
      },
      {
        accessorKey: "ltg_regions",
        header: "City",
        size: 50,
        Cell: ({ cell }) => capitalizeFirstLetter(cell.getValue()),
      },
      {
        accessorFn: (row) => row[getDynamicFields(row.ltg_type).area],
        header: "Size",
        size: 50,
        Cell: ({ renderedCellValue }) => <span>{renderedCellValue}</span>,
      },
      {
        id: "ltg_create_date",
        accessorKey: "ltg_create_date",
        header: "Added On",
        filterVariant: "date",
        filterFn: "lessThan",
        sortingFn: "datetime",
        Cell: ({ cell }) => {
          const dateValue = cell.getValue();
          return (
            <span>
              {dateValue ? dayjs(dateValue).format('YYYY-MM-DD') : ''}
            </span>
          );
        },
      },
    ], [navigate, setOpen]);

  const tableData = useMemo(() => (data || []).map((item, index) => ({
    ...item,
    RowID: index + 1
  })), [data]);


  const table = useMaterialReactTable({
    columns,
    data: tableData,
    enableColumnFilterModes: true,
    enableColumnOrdering: true,
    enableGrouping: true,
    enableDensityToggle: true,
    enableColumnPinning: true,
    enableFacetedValues: true,
    enableRowSelection: true,
    enableStickyHeader: true,
    enableStickyFooter: true,

    initialState: {
      density: 'compact',
      pagination: { pageSize: 5 },
      showGlobalFilter: true,
      columnPinning: {
        left: ["mrt-row-expand", "mrt-row-select"],
        right: [],
      },
    },
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
    muiSearchTextFieldProps: {
      size: "small",
      variant: "outlined",
    },
    muiPaginationProps: {
      color: "secondary",
      rowsPerPageOptions: [2, 5, 10, 15, 20],
      shape: "rounded",
      variant: "outlined",
    },
    muiTableBodyCellProps: {
      sx: { fontSize: '0.9rem' },
    },
    muiTableHeadCellProps: {
      sx: { fontSize: '1rem' },
    },
  });

  return (
    <div className="w-full mx-auto bg-black">
      <Dialog onClose={handleClose} open={open}>
        <div className="p-4 space-y-5">
          <h2>Are you sure want to delete</h2>
          <div className="flex items-center justify-end gap-5 button">
            <button
              className="px-3 py-2 border rounded-md shadow-sm"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (selectedId !== null && selectedType !== null) {
                  mutation.mutate({ id: selectedId, type: selectedType });
                }
                setOpen(false);
              }}
              className="px-3 py-2 text-white bg-red-600 border rounded-md shadow-sm"
            >
              Delete
            </button>
          </div>
        </div>
      </Dialog>
      <MaterialReactTable
        table={table}
      />
    </div>
  );
}

export default Table;
