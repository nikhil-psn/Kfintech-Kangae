import React from 'react'
import EmployeeForm from "./EmployeeForm";
import PageHeader from "./PageHeader";
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import { Paper,makeStyles } from '@material-ui/core';
import { BulbFilled } from '@ant-design/icons';

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    }
}))

export default function Employees() {

    const classes = useStyles();

    return (
        <>
            <PageHeader
                title="Flaunt you idea"
                subTitle="Ideas are the beginning points of all fortunes."
                icon={<BulbFilled fontSize="large" />}
            />
            <Paper className={classes.pageContent}>
                <EmployeeForm />
            </Paper>
        </>
    )
}