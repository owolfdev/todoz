import React, { useMemo, useState, useCallback, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  ColDef,
  IsFullWidthRowParams,
  RowHeightParams,
} from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  useSession,
  useSupabaseClient,
  useUser,
} from "@supabase/auth-helpers-react";
import axios from "axios";
import { log } from "console";

type data = {
  completed: boolean;
  created_at: string;
  description: string;
  due_date: string;
  id: string;
  images: string[];
  title: string;
};

interface AGGridProps {
  path: string;
}

const FullWidthGrid: React.FC<AGGridProps> = ({ path }) => {
  const [agGridTheme, setAgGridTheme] = useState("ag-theme-alpine");
  const [rowData, setRowData] = useState<data[]>([]);
  const router = useRouter();
  const currentPath = router.asPath;
  const pathSegments = currentPath.split("/");
  const lastSegment = pathSegments[pathSegments.length - 1];
  const session = useSession();

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get("/api/todos");
        setRowData(data);
        console.log("Data:", data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    //console.log("lastSegment", lastSegment);

    if (typeof window !== "undefined") {
      const darkMode = window.matchMedia("(prefers-color-scheme: dark)");

      const handleDarkModeChange = (e: any) => {
        if (e.matches) {
          setAgGridTheme("ag-theme-alpine-dark");
        } else {
          setAgGridTheme("ag-theme-alpine");
        }
      };

      // Check the initial color scheme preference
      handleDarkModeChange(darkMode);

      // Set up the event listener for color scheme changes
      darkMode.addEventListener("change", handleDarkModeChange);

      // Clean up the event listener on component unmount
      return () => {
        darkMode.removeEventListener("change", handleDarkModeChange);
      };
    }
  }, []);

  const containerStyle = useMemo(
    () => ({ width: "100%", height: "600px" }),
    []
  );

  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

  const [columnDefs] = useState<ColDef[]>([
    { field: "title" },
    {
      headerName: "Due Date",
      field: "due_date",
      sortable: true,
      sort: "desc",
      comparator: (valueA, valueB, nodeA, nodeB, isInverted) => {
        const dateA = new Date(valueA);
        const dateB = new Date(valueB);
        return dateA.getTime() - dateB.getTime();
      },
    },
    {
      headerName: "Completed",
      field: "completed",
      sortable: true,
      filter: true,
      cellRenderer: (params: any) => {
        const value = params.value;
        return value ? "Yes" : "No";
      },
    },
  ]);

  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      sortable: true,
      resizable: true,
      filter: true,
      suppressMovable: true,
    };
  }, []);

  const isFullWidthRow = useCallback((params: IsFullWidthRowParams) => {
    return true;
  }, []);

  const getRowHeight = useCallback((params: RowHeightParams) => {
    return 80;
  }, []);

  const fullWidthCellRenderer = ({ node }: any) => {
    const { title, id, due_date, description, completed } = node.data;
    return (
      <Link href={`/todo/${id}`}>
        <div
          key={id}
          title={description}
          className="px-5 py-2 my-full-width-row"
        >
          <div className="">
            <h2 className="font-sans text-xl sm:text-2xl">{title}</h2>
          </div>
          <div className="flex mb-2 space-x-5 text-gray-500">
            <div className="text-sm">{due_date}</div>
            <div className="text-sm">{completed ? "Yes" : "No"}</div>
          </div>
          <hr />
        </div>
      </Link>
    );
  };

  return (
    <div style={containerStyle}>
      <div style={gridStyle} className={`${agGridTheme} my-grid`}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          isFullWidthRow={isFullWidthRow}
          getRowHeight={getRowHeight}
          components={{ fullWidthCellRenderer }}
          fullWidthCellRenderer="fullWidthCellRenderer"
          pagination={true}
          paginationPageSize={6}
        ></AgGridReact>
      </div>
    </div>
  );
};

export default FullWidthGrid;
